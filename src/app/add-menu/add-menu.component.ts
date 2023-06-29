import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Post, dashBoardItems } from '../shared/app.const';
import { SharedService } from '../shared/shared.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
})
export class AddMenuComponent implements OnInit, OnChanges {
  @Input() receivedEditPost: any = {};
  @Output() instaNotesData = new EventEmitter<any>();

  dashBoardItems = dashBoardItems;
  keywordArray: any[] = [];
  instaNotes: any[] = [];

  myForm: FormGroup = new FormGroup({
    url: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    keywords: new FormControl('', Validators.required),
    notes: new FormControl(''),
    links: new FormControl('')
  });

  addedLinks: any[] = [''];
  notesData: any[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.getLocalStorageData();
    this.setEditValues();
    if (this.receivedEditPost === '') {
      this.clearInputFields();
    }
  }

  pushAddedLinks(event:any,index:any) {
    this.addedLinks[index] = event.target.value;
    console.log(this.addedLinks);
  }

  addLink() {
    this.addedLinks.push('');
  }

  deleteLink(index: any) {
    this.addedLinks.splice(index, 1);
  }

  setEditValues() {  
    if (this.receivedEditPost) {
      this.instaNotes.filter((item) => {
        if (item.postid === this.receivedEditPost) {
          this.myForm.get('url')?.setValue(item.postid);
          this.myForm.get('title')?.setValue(item.postTitle);
          this.myForm.get('category')?.setValue(item.postCategory);
          this.myForm.get('keywords')?.setValue(item.postKeywords);
          this.myForm.get('notes')?.setValue(item.postNotes);
          this.addedLinks = [...item.postLinks];
        }
      });
    }
  }

  getLocalStorageData() {
    const existingData = localStorage.getItem('mainData');
    this.instaNotes = existingData ? JSON.parse(existingData) : this.instaNotes;
  }

  addPost(post: Post) {
    // const { postCategory } = post;
    // if (!this.instaNotes[postCategory]) {
    //   this.instaNotes[postCategory] = [];
    // }
    this.instaNotes.push(post);
    // this.currentData.addNewData.push(post);
    // this.sharedService.setLatestData(this.currentData);
  }

  getPostID(url: any) {
    if (url.startsWith('https://www.instagram')) {
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
    } else {
      return url;
    }
  }

  getPostKeywords(keywords: any) {
      if(typeof(keywords) === 'string') {
        var splitKeywords = keywords.split(',');
        splitKeywords.forEach((item:any) => {
          if (item !== '' && item.length > 2) {
            this.keywordArray.push(item.toLowerCase());
          }
        });
        return this.keywordArray;
      } else {
        return keywords;
      }
  }

  clearInputFields() {
    this.myForm.reset();
    this.addedLinks = []
  }

  clearButton() {
    this.clearInputFields();
    this.sharedService.showWarn('Inputs are Cleared');
  }

  savePostDetails() {
    if (this.myForm.valid) {
      const addnewData: Post = {
        postid: this.getPostID(this.myForm.value.url),
        postTitle: this.myForm.value.title,
        postCategory: this.myForm.value.category,
        postKeywords: this.getPostKeywords(this.myForm.value.keywords),
        postNotes: this.myForm.value.notes,
        postLinks: this.addedLinks,
        postTime: new Date(),
      };
      console.log(addnewData);
      this.instaNotesData.emit(addnewData);
      this.clearInputFields();
      this.sharedService.showSuccess('Post Saved Successfully!');
    } else {
      this.sharedService.showError('Please Enter Valid Inputs');
    }
  }
}
