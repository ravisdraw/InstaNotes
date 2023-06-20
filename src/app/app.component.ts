import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { dashBoardItems } from './shared/app.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  isAddData: boolean = false;

  ngOnInit() {
    this.sharedService.currentActiveDash.subscribe((status) => {
      if (status === 'Add Data') {
        this.isAddData = true;
      } else {
        this.isAddData = false;
      }
    });
  }
  title = 'InstaNotes';
}
