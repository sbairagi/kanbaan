import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todo: BehaviorSubject<any> = new BehaviorSubject([]);

  done: BehaviorSubject<any> = new BehaviorSubject([]);

  inprogress: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor() {

   }

   public saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string) {
    let data = JSON.parse(localStorage.getItem(key) as string);
    console.log(data);
    if (data){
      if (key == 'todo'){
          this.todo.next(data)
      }else if (key == 'done'){
          this.done.next(data)
      }else if (key == 'inprogress'){
          this.inprogress.next(data)
      }
    }
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
