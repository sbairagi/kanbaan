import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from 'src/app/service/todo.service';


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class AddTodoComponent implements OnInit {

  id: number;
  todos: any;
  status = [
    {'text': 'Todo', 'id': 'todo'},
    {'text': 'Done', 'id': 'done'},
    {'text': 'In Progress', 'id': 'inprogress'},
  ];

  addTodoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('',  Validators.required),
    changeStatus: new FormControl('', [Validators.required])
  });


  constructor(
    public dialogRef: MatDialogRef<AddTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private todoServices: TodoService) 
  {
  
   }

  ngOnInit(): void {
  }

  

  close(): void {
    this.dialogRef.close();
  }

  save(){
    if (this.addTodoForm.value.changeStatus){
      if (this.addTodoForm.value.changeStatus === 'todo'){
        this.todoServices.todo.subscribe(data => {
          this.id = data.length + 1
          this.todos = data;
        })
        this.todoServices.done.subscribe(data => {
          this.id += data.length
        })
        this.todoServices.inprogress.subscribe(data => {
          this.id += data.length
        })
        this.todos.push({'id': this.id, 'title': this.addTodoForm.controls['title'].value, "status": 'todo'})
        this.todoServices.todo.next(this.todos)
      } else if (this.addTodoForm.value.changeStatus === 'done'){
        this.todoServices.todo.subscribe(data => {
          this.id = data.length + 1
        })
        this.todoServices.done.subscribe(data => {
          this.id += data.length
          this.todos = data;
        })
        this.todoServices.inprogress.subscribe(data => {
          this.id += data.length
        })
        this.todos.push({'id': this.id, 'title': this.addTodoForm.controls['title'].value, "status": "done"})
        this.todoServices.done.next(this.todos)
      } else if (this.addTodoForm.value.changeStatus === 'inprogress'){
        this.todoServices.todo.subscribe(data => {
          this.id = data.length + 1
        })
        this.todoServices.done.subscribe(data => {
          this.id += data.length
        })
        this.todoServices.inprogress.subscribe(data => {
          this.id += data.length
          this.todos = data;
        })
        this.todos.push({'id': this.id, 'title': this.addTodoForm.controls['title'].value, "status": "inprogress"})
        this.todoServices.inprogress.next(this.todos)
      }
    }
  }

}
