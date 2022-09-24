import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todo: BehaviorSubject<any> = new BehaviorSubject([
    {'id': 1, 'title': "Get to work", "desc": " test description", "status": 'todo'},
    {'id': 2, 'title': "Pick up groceries",  "desc": " test description", "status": 'todo'},
    {'id': 3, 'title': "Fall asleep",  "desc": " test description", "status": 'todo'},
    {'id': 4, 'title': "Go home",  "desc": " test description", "status": 'todo'},
    

  ]);
  done: BehaviorSubject<any> = new BehaviorSubject([
    {'id': 5, 'title': "Brush teeth", "desc": " test description", "status": 'done'},
    {'id': 6, 'title': "Take a shower", "desc": " test description", "status": 'done'},
    {'id': 7, 'title': "Check e-mail", "desc": " test description", "status": 'done'},
    {'id': 8, 'title': "Walk dog", "desc": " test description", "status": 'done'},
  ])
  inprogress: BehaviorSubject<any> = new BehaviorSubject([{'id': 9, 'title': "Get up", "desc": " test description", "status": 'inprogress'},])

  constructor() {

   }
}
