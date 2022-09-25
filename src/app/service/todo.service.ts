import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todo: BehaviorSubject<any> = new BehaviorSubject([
    {'id': 1, 'title': "Get to work", "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium laborum asperiores", "status": 'todo'},
    {'id': 2, 'title': "Pick up groceries",  "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium laborum asperiores", "status": 'todo'},
    {'id': 3, 'title': "Fall asleep",  "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium laborum asperiores", "status": 'todo'},
    {'id': 4, 'title': "Go home",  "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium laborum asperiores", "status": 'todo'},
  ]);

  done: BehaviorSubject<any> = new BehaviorSubject([
    {'id': 5, 'title': "Brush teeth", "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium laborum asperiores", "status": 'done'},
    {'id': 6, 'title': "Take a shower", "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium laborum asperiores", "status": 'done'},
    {'id': 7, 'title': "Check email", "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium laborum asperiores", "status": 'done'},
    {'id': 8, 'title': "Walk dog", "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium laborum asperiores", "status": 'done'},
  ]);

  inprogress: BehaviorSubject<any> = new BehaviorSubject([{'id': 9, 'title': "Get up", "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium laborum asperiores", "status": 'inprogress'},]);

  constructor() {

   }
}
