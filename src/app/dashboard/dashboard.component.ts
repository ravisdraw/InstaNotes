import { Component, OnInit } from '@angular/core';
import { dashBoardItems } from '../shared/app.const';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(private sharedService : SharedService) {}

  dashBoardItems = dashBoardItems;

  ngOnInit() {
   
  }

  checkActive(name:any) {
    dashBoardItems.forEach(item => {
      if(item.name !== name) {
        item.active = false;
      } else {
        item.active = true;
      }
    })
    this.sharedService.setActiveDash(name);
  }
}
