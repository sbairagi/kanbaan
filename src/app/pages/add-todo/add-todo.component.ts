import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  title = ''
  id;
  todos;

  constructor(
    public dialogRef: MatDialogRef<AddTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private todoServices: TodoService) 
  {

   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(){
    console.log(this.title)
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
    this.todos.push({'id': this.id, 'title': this.title, "status": 'todo'})
    this.todoServices.todo.next(this.todos)
  }

  ngOnInit(): void {
  }

}
