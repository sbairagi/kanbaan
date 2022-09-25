import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from '../../service/todo.service';


@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {

  id: any = 0;
  title: string = '';
  preStatus: string = '';
  todos: any;
  editTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    description: new FormControl('',  [Validators.required, Validators.minLength(25)]),
    changeStatus: new FormControl(null, [Validators.required])
  });
  status = [
    {'text': 'Todo', 'id': 'todo'},
    {'text': 'In Progress', 'id': 'inprogress'},
    {'text': 'Done', 'id': 'done'},
  ];
  todo: any = []
  done: any = []
  inprogress: any = [] 

  constructor(
    public dialogRef: MatDialogRef<MyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private todoServices: TodoService) 
  {
    this.id = data.id;
    this.preStatus = data.status
    todoServices.todo.subscribe(data => {
      this.todo = data
    });
    todoServices.done.subscribe(data => {
      this.done = data
    });
    todoServices.inprogress.subscribe(data => {
      this.inprogress = data
    })
    this.title = data.title;
    this.editTodoForm.setValue({title: data.title, description: data.desc, changeStatus: data.status});
   }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  save(){
    if (this.editTodoForm.value.changeStatus !== null){
      if (this.editTodoForm.value.changeStatus == this.preStatus){
        if (this.editTodoForm.value.changeStatus == 'todo'){
          this.todoServices.todo.subscribe(res => {
            res.map(item => {
              if (item.id == this.id){
                item['title'] = this.editTodoForm.value.title
                item['desc'] = this.editTodoForm.value.description
              }
            });
            this.todoServices.saveData('todo', res)
          });
        }else if (this.editTodoForm.value.changeStatus ==  'done'){
          this.todoServices.done.subscribe(res => {
            res.map(item => {
              if (item.id == this.id){
                item['title'] = this.editTodoForm.value.title
                item['desc'] = this.editTodoForm.value.description
              }
            });
            this.todoServices.saveData('done', res)
          });
        }else if (this.editTodoForm.value.changeStatus == 'inprogress'){
          this.todoServices.inprogress.subscribe(res => {
            res.map(item => {
              if (item.id == this.id){
                item['title'] = this.editTodoForm.value.title
                item['desc'] = this.editTodoForm.value.description
              }
            });
            this.todoServices.saveData('inprogress', res)
          });
        }
      }
      else{
        if (this.preStatus == "todo"){
          this.todoServices.todo.next(this.todo.filter(x => x.id != this.id))
          this.todoServices.saveData('todo', this.todo.filter(x => x.id != this.id))
        }else if (this.preStatus == "done") {
          this.todoServices.done.next(this.done.filter(x => x.id != this.id))
          this.todoServices.saveData('done', this.done.filter(x => x.id != this.id))
        }else if(this.preStatus == 'inprogress') {
          this.todoServices.inprogress.next(this.inprogress.filter(x => x.id != this.id))
          this.todoServices.saveData('inprogress', this.inprogress.filter(x => x.id != this.id))
        }

        if (this.editTodoForm.value.changeStatus === 'todo'){
          this.todoServices.todo.subscribe(data => {
            this.todos = data;
          })
          this.todos.push({'id': this.id, 'title': this.editTodoForm.controls['title'].value, "desc": this.editTodoForm.controls['description'].value,  "status": 'todo'})
          this.todoServices.todo.next(this.todos)
          this.todoServices.saveData('todo', this.todos)
        } else if (this.editTodoForm.value.changeStatus === 'done'){
          this.todoServices.done.subscribe(data => {
            this.todos = data;
          })
          this.todos.push({'id': this.id, 'title': this.editTodoForm.controls['title'].value, "desc": this.editTodoForm.controls['description'].value, "status": "done"})
          this.todoServices.done.next(this.todos)
          this.todoServices.saveData('done', this.todos)
        } else if (this.editTodoForm.value.changeStatus === 'inprogress'){
          this.todoServices.inprogress.subscribe(data => {
            this.todos = data;
          })
          this.todos.push({'id': this.id, 'title': this.editTodoForm.controls['title'].value, "desc": this.editTodoForm.controls['description'].value, "status": "inprogress"})
          this.todoServices.inprogress.next(this.todos)
          this.todoServices.saveData('inprogress', this.todos)
        }
      
      }
    }
  }
}