import { Injectable, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService{

  private latestData = new BehaviorSubject<any>({});
  currentData = this.latestData.asObservable();

  isEdit = false;

  isAddData  = false;

  constructor(private toast: NgToastService) { }

  setLatestData(data:any) {
    this.latestData.next(data);
    localStorage.setItem('instaNotes', JSON.stringify(data));
  }

  //https://www.npmjs.com/package/ng-angular-popup

  showSuccess(msg:string) {
    this.toast.success({detail:"SUCCESS",summary:msg,duration:2000,position:'topCenter'});
  }
  
  showError(msg:string) {
    this.toast.error({detail:"ERROR",summary:msg,sticky:true,position:'topCenter'});
  }

  showInfo(msg:string) {
    this.toast.info({detail:"INFO",summary:msg,sticky:true,position:'topCenter'});
  }

  showWarn(msg:string) {
    this.toast.warning({detail:"WARN",summary:msg,duration:2000,position:'topCenter'});
  }

}
