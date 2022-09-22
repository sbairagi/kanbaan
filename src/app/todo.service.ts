import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todo: BehaviorSubject<any> = new BehaviorSubject([
    {'id': 1, 'title': "Get to work", "status": 'todo'},
    {'id': 2, 'title': "Pick up groceries", "status": 'todo'},
    {'id': 3, 'title': "Fall asleep", "status": 'todo'},
    {'id': 4, 'title': "Go home", "status": 'todo'},
    

  ]);
  done: BehaviorSubject<any> = new BehaviorSubject([
    {'id': 5, 'title': "Brush teeth", "status": 'done'},
    {'id': 6, 'title': "Take a shower", "status": 'done'},
    {'id': 7, 'title': "Check e-mail", "status": 'done'},
    {'id': 8, 'title': "Walk dog", "status": 'done'},
  ])
  inprogress: BehaviorSubject<any> = new BehaviorSubject([{'id': 9, 'title': "Get up", "status": 'inprogress'},])

  constructor() {

   }
}
