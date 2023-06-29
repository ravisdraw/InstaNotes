import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { dashBoardItems } from '../shared/app.const';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  @Output() activeDashBoardItem = new EventEmitter<string>();

  dashBoardItems = dashBoardItems;

  ngOnInit() {
    this.getLocalStorage();
  }

  getLocalStorage() {
    // const existingData = localStorage.getItem('instaNotes');
    // this.latestData = existingData ? JSON.parse(existingData) : this.latestData;
  }

  checkActive(name: any) {
    this.activeDashBoardItem.emit(name);
    dashBoardItems.forEach((item) => {
      if (item.name !== name) {
        item.active = false;
      } else {
        item.active = true;
      }
    });
    // this.sharedService.setLatestData(this.latestData);
  }
}
