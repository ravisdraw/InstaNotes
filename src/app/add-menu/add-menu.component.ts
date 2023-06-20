import { Component, Input, OnInit } from '@angular/core';
import { Post, SharedData, dashBoardItems } from '../shared/app.const';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
})
export class AddMenuComponent implements OnInit {

  @Input() receivedEditPost:any = {};
  dashBoardItems = dashBoardItems;
  postCode = '';
  postTitle = '';
  postCategory = '';
  postkeyWords = '';
  postNotes = '';
  keywordArray: any[] = [];
  instaNotes: any[] = [];
  currentData: SharedData = {
    activeDash: '',
    addNewData: [],
    editID : ''
  };

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getLocalStorageData();
    this.getLatestData();
  }
 
  getLocalStorageData() {
    const existingData = localStorage.getItem('instaNotes');
    this.currentData = existingData ? JSON.parse(existingData) : this.currentData;
  }

  getLatestData() {
    this.sharedService.currentData.subscribe(data => {
      if(data) {
        this.currentData = data;
      }
    })
  }

  addPost(post: Post) {
    // const { postCategory } = post;
    // if (!this.instaNotes[postCategory]) {
    //   this.instaNotes[postCategory] = [];
    // }
    this.instaNotes.push(post);
    this.currentData.activeDash = 'Add Data';
    this.currentData.addNewData.push(post);
    this.sharedService.setLatestData(this.currentData)
  }

  getPostID(url: any) {
    var pattern1 = /\/p\/([A-Za-z0-9_-]+)/;
    var pattern2 = /\/reel\/([A-Za-z0-9_-]+)/;
    var match = url.match(pattern1);
    if (match === null) {
      match = url.match(pattern2);
    }
    if (match && match.length >= 2) {
      return match[1];
    } else {
      return null;
    }
  }

  getPostKeywords(keywords: string) {
    var splitKeywords = keywords.trim().split(',');
    splitKeywords.forEach((item) => {
      if (item !== '' && item.length > 2) {
        this.keywordArray.push(item);
      }
    });
  }

  clearInputFields() {
    this.postCode = '';
    this.postkeyWords = '';
    this.postCategory = '';
    this.postTitle = '';
    this.postNotes = '';
  }

  cancelButton() {
    this.clearInputFields();
  }

  savePostDetails() {
    let postID = this.getPostID(this.postCode);
    this.getPostKeywords(this.postkeyWords);

    const newPost: Post = {
      postid: postID,
      postTitle: this.postTitle,
      postCategory: this.postCategory,
      postKeywords: this.keywordArray,
      postNotes: this.postNotes,
      postTime: new Date(),
    };

    // if (this.postCode !== '') {
    //   this.addPost(newPost);
    // }
      this.addPost(newPost);
    this.clearInputFields();
  }
}
