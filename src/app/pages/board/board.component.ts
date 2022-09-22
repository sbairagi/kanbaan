import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MyModalComponent } from 'src/app/pages/my-modal/my-modal.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { TodoService } from 'src/app/todo.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  // constructor() { }

  name: string;
  color: string;
  todo: any = []

  done: any = []
  inprogress: any = [] 

  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  // inprogress = ['Get up', ];


  constructor(public dialog: MatDialog, public todoServices: TodoService) {
    todoServices.todo.subscribe(data => {
      this.todo = data
    });
    todoServices.done.subscribe(data => {
      this.done = data
    });
    todoServices.inprogress.subscribe(data => {
      this.inprogress = data
    })
   }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '250px',
      data: data
    });
    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }

  addTodo() {
    const dialogRef = this.dialog.open(AddTodoComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.setStatus(event);
    }
  }
  
  ngOnInit(): void {
  }

  setStatus(event){
      if (event.container.data[0]['status'] == 'todo'){
        this.todoServices.todo.subscribe(data => {
          data.map(x => {
            x['status'] = 'todo'
          });
        });
      }else if (event.container.data[0]['status'] == 'done'){
        this.todoServices.done.subscribe(data => {
          data.map(x => {
            x['status'] = 'done'
          });
        });
      }else if (event.container.data[0]['status'] == 'inprogress'){
        this.todoServices.inprogress.subscribe(data => {
          data.map(x => {
            x['status'] = 'inprogress'
          });
        });
      }
  }

  deleteTodo(id: number, status: string){
    console.log(id, status)
    if (status === 'todo'){
      this.todo = this.todo.filter(x => x.id != id);
    }else if (status === 'done'){
      this.done = this.done.filter(x => x.id != id);
    }else{
      this.inprogress = this.inprogress.filter(x => x.id != id);
    }
  }

}
