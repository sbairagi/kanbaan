import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MyModalComponent } from 'src/app/pages/my-modal/my-modal.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { TodoService } from 'src/app/service/todo.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  todo: any = []
  done: any = []
  inprogress: any = [] 


  constructor(public dialog: MatDialog, public todoServices: TodoService) {
    this.todoServices.getData('todo');
    this.todoServices.getData('done');
    this.todoServices.getData('inprogress');
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
    }
    this.setStatus();
  }
  
  ngOnInit(): void {
  }

  setStatus(){
    this.inprogress.map(x => {
      x['status'] = 'inprogress'
    });
    this.done.map(x => {
      x['status'] = 'done'
    });
    this.todo.map(x => {
      x['status'] = 'todo'
    });
    this.todoServices.saveData('todo', this.todo)
    this.todoServices.getData('todo');
    this.todoServices.saveData('done', this.done)
    this.todoServices.getData('done');
    this.todoServices.saveData('inprogress', this.inprogress)
    this.todoServices.getData('inprogress');
  }

  deleteTodo(id: number, status: string){
    if (status === 'todo'){
      this.todoServices.todo.next(this.todo.filter(x => x.id != id))
      this.todoServices.saveData('todo', this.todo.filter(x => x.id != id))
    }else if (status === 'done'){
      this.todoServices.done.next(this.done.filter(x => x.id != id))
      this.todoServices.saveData('done', this.done.filter(x => x.id != id))
    }else if(status === 'inprogress'){
      this.todoServices.inprogress.next(this.inprogress.filter(x => x.id != id))
      this.todoServices.saveData('inprogress', this.inprogress.filter(x => x.id != id))
    }
  }

  editNote(data: any) {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '250px',
      data: data
    });
    dialogRef.afterClosed().subscribe(res => {
      
    });
  }

  addNote() {
    const dialogRef = this.dialog.open(AddTodoComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(res => {
      
    });
  }

}
