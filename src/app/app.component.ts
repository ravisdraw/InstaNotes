import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { Post, SharedData, dashBoardItems } from './shared/app.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  isAddData: boolean = false;
  title = 'InstaNotes';
  latestData: SharedData = {
    activeDash: 'Add Data',
    addNewData: [],
    editID: ''
  };

  editData: Post = {
    postid: '',
    postTitle: '',
    postCategory: '',
    postKeywords: [],
    postNotes: '',
    postTime: new Date()
  } 

  ngOnInit() {
    this.sharedService.currentData.subscribe((status) => {
      if (status.activeDash === 'Add Data') {
        this.isAddData = true;
      } else {
        this.isAddData = false;
      }
    });
    this.getLocalStorageData();
  }

  getEditPostId(data:string) {
    this.latestData.addNewData.filter(item => {
        if(item.postid === data){
          this.editData.postid = item.postid;
          this.editData.postTitle = item.postTitle;
          this.editData.postCategory = item.postCategory;
          this.editData.postKeywords = item.postKeywords;
          this.editData.postNotes = item.postNotes;
        }
      });
      console.log(this.editData);
      
  }
  
  getLocalStorageData() {
    const existingData = localStorage.getItem('instaNotes');
    this.latestData =  existingData ? JSON.parse(existingData) : this.latestData;
    console.log(this.latestData);
    this.sharedService.setLatestData(this.latestData);
  }
}
