import { Component, OnInit } from '@angular/core';
import { Post, dashBoardItems } from '../shared/app.const';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
})
export class AddMenuComponent implements OnInit {
  dashBoardItems = dashBoardItems;
  postCode = '';
  postTitle = '';
  postCategory = '';
  postkeyWords = '';
  postNotes = '';
  keywordArray: any[] = [];
  instaNotes: any[] = [];

  ngOnInit(): void {
    this.getLocalStorageData();
  }

  getLocalStorageData() {
    const existingData = localStorage.getItem('instNotes');
    this.instaNotes = existingData ? JSON.parse(existingData) : [];
  }

  addPost(post: Post) {
    // const { postCategory } = post;
    // if (!this.instaNotes[postCategory]) {
    //   this.instaNotes[postCategory] = [];
    // }
    this.instaNotes.push(post);
    localStorage.setItem('instaNotes', JSON.stringify(this.instaNotes));
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

    this.addPost(newPost);
    this.clearInputFields();
  }
}
