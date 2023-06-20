import { Component, OnInit } from '@angular/core';
import { dashBoardItems,SharedData } from '../shared/app.const';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(private sharedService : SharedService) {}

  dashBoardItems = dashBoardItems;

   latestData : SharedData = {
    activeDash : '',
    addNewData : [],
    editID : ''
  };

  ngOnInit() {
    this.getLocalStorage();
  }

  getLocalStorage() {
    const existingData = localStorage.getItem('instaNotes');
    this.latestData = existingData ? JSON.parse(existingData) : this.latestData;
    console.log("insidedash ", this.latestData);
  }

  checkActive(name:any) {

    dashBoardItems.forEach(item => {
      if(item.name !== name) {
        item.active = false;
      } else {
        item.active = true;
      }
    })
    this.sharedService.setLatestData(this.latestData);
  }
}
