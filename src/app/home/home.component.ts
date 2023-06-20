import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faClose, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Post, SharedData } from '../shared/app.const';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  @Output() homeToApp = new EventEmitter<string>();

  searchIcon = faSearch;
  closeIcon = faClose;
  editIcon = faEdit;
  deleteIcon = faClose;
  setSearch = false;
  tags: string[] = [];
  latestPost: SharedData = {
    activeDash: '',
    addNewData: [],
    editID: ''
  };

  ngOnInit(): void {
    this.getLatestData();
    this.sortedPost();
  }

  getLatestData() {
    this.sharedService.currentData.subscribe((data) => {
      this.latestPost = data;
    });
  }

  editPost(postId: any) {
    this.homeToApp.emit(postId);
  }

  deletePost(postId: any) {
    const filteredArray = this.latestPost.addNewData.filter((item) => {
      if (item.postid !== postId) {
        return item;
      }
    });

    this.latestPost.addNewData = filteredArray;
    this.sharedService.setLatestData(this.latestPost);
  }

  filteringTags() {
    for (const obj of this.latestPost.addNewData) {
      const tagArray: string[] = obj.postKeywords;
      for (const tag of tagArray) {
        if (!this.tags.includes(tag)) {
          this.tags.push(tag);
        }
      }
    }
  }

  sortedPost() {
    this.latestPost.addNewData.sort(
      (a: any, b: any) =>
        new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
    );
    this.filteringTags();
  }

  setSearchStatus() {
    this.setSearch = !this.setSearch;
  }
}
