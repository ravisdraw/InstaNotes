import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { dashBoardItems } from './app.const';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private activeDash = new BehaviorSubject<string>('Add Data');
  currentActiveDash = this.activeDash.asObservable();

  isAddData  = false;

  constructor() { }

  // changeActiveState(name:string) {
  //   dashBoardItems.forEach (item => {
  //     if(item.name !== name) {
  //       item.active = false;
  //     } else {
  //       item.active = false;
  //     }
  //   })
  // }

  setActiveDash(name:string) {
    this.activeDash.next(name);
    // this.changeActiveState(name);
  }
}
