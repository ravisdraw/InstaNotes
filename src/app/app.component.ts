import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SharedService } from './shared/shared.service';
import { Post, dashBoardItems } from './shared/app.const';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  @Output() activeMenu = new EventEmitter<any>();

  activeDashboardMenu = 'All Post';
  recentPost = {};
  isEditClicked = false;

  isAddData: boolean = false;
  title = 'InstaNotes';

  editData = '';

  ngOnInit() {
    this.getLocalStorageData();
  }

  getActiveDashboardItem(data: any) {
    // if (data === 'Add Post') {
    //   this.editData = '';
    //   this.isEditClicked = true;
    // } else {
    //   this.isEditClicked = false;
    // }
    this.editData = '';
    this.activeDashboardMenu = data;
    this.isEditClicked = false;
  }

  getEditPostId(data: any) {
    if (data.postId === 'newpost') {
      this.editData = ''
      this.isEditClicked = data.isEdit;
    } else {
      this.editData = data.postId;
      this.isEditClicked = data.isEdit;
    }
  }

  getLocalStorageData() {
    const existingData = localStorage.getItem('instaNotes');
    // this.latestData = existingData ? JSON.parse(existingData) : this.latestData;
    // this.sharedService.setLatestData(this.latestData);
  }

  getInstaNotesData(data: any) {
    this.recentPost = data;
  }
}
