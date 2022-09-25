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

  id: number = 0;
  todos: any = [];
  status = [
    {'text': 'Todo', 'id': 'todo'},
    {'text': 'In Progress', 'id': 'inprogress'},
    {'text': 'Done', 'id': 'done'},
  ];

  addTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    description: new FormControl('',  [Validators.required, Validators.minLength(25)]),
    changeStatus: new FormControl(null, [Validators.required])
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
          
          if (data){
            this.id += data.length + 1
            this.todos = data;
          }else{
            this.id = 1
            this.todos = [];
          }
        })
        this.todoServices.done.subscribe(data => {
          if (data){
            this.id += data.length
          }
        })
        this.todoServices.inprogress.subscribe(data => {
          if (data){
            this.id += data.length
          }
        })
        this.todos.push({'id': this.id, 'title': this.addTodoForm.controls['title'].value, "desc": this.addTodoForm.controls['description'].value, "status": 'todo'})
        this.todoServices.saveData('todo', this.todos)
        this.todoServices.todo.next(this.todos)
      } else if (this.addTodoForm.value.changeStatus === 'done'){
        this.todoServices.todo.subscribe(data => {
          if (data){
            this.id += data.length
          }
        })
        this.todoServices.done.subscribe(data => {
          if (data){
            this.id += data.length  + 1
            this.todos = data;
          }else{
            this.id = 1
            this.todos = [];
          }
        })
        this.todoServices.inprogress.subscribe(data => {
          if (data){
            this.id += data.length
          }
        })
        this.todos.push({'id': this.id, 'title': this.addTodoForm.controls['title'].value, "desc": this.addTodoForm.controls['description'].value, "status": "done"})
        this.todoServices.saveData('done', this.todos)
        this.todoServices.done.next(this.todos)
      } else if (this.addTodoForm.value.changeStatus === 'inprogress'){
        this.todoServices.todo.subscribe(data => {
          if (data){
            this.id += data.length
          }
        })
        this.todoServices.done.subscribe(data => {
          if (data){
            this.id += data.length;
          }
        })
        this.todoServices.inprogress.subscribe(data => {
          if (data){
            this.id += data.length + 1
            this.todos = data;
          }else{
            this.id = 1
            this.todos = [];
          }
        })
        this.todos.push({'id': this.id, 'title': this.addTodoForm.controls['title'].value, "desc": this.addTodoForm.controls['description'].value, "status": "inprogress"})
        this.todoServices.saveData('inprogress', this.todos)
        this.todoServices.inprogress.next(this.todos)
      }
    }
  }

}
