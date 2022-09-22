import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from '../../todo.service';


@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {

  editdata;
  title = ''

  constructor(
    public dialogRef: MatDialogRef<MyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private todoServices: TodoService) 
  {
    this.editdata = data;
    this.title = data.title;
   }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  save(){
    if (this.editdata.status == 'todo'){
      this.todoServices.todo.subscribe(res => {
        res.map(item => {
          if (item.id == this.editdata.id){
            item['title'] = this.title
          }
        });
      });
    }else if (this.editdata.status ==  'done'){
      this.todoServices.done.subscribe(res => {
        res.map(item => {
          if (item.id == this.editdata.id){
            item['title'] = this.title
          }
        });
      });
    }else if (this.editdata.status == 'inprogress'){
      this.todoServices.inprogress.subscribe(res => {
        res.map(item => {
          if (item.id == this.editdata.id){
            item['title'] = this.title
          }
        });
      });
    }
  }
}