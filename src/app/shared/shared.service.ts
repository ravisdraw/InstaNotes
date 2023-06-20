import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService{

  private latestData = new BehaviorSubject<any>({});
  currentData = this.latestData.asObservable();

  isEdit = false;

  isAddData  = false;

  constructor() { }

  setLatestData(data:any) {
    this.latestData.next(data);
    localStorage.setItem('instaNotes', JSON.stringify(data));
  }
}
