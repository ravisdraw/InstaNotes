import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { faClose, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../shared/app.const';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnChanges, OnInit {
  constructor(private sharedService: SharedService) {}

  @Output() homeToApp = new EventEmitter<any>();
  @Input() sentrecentPost: any = {};
  @Input() activeDashBoardMenu: any = '';

  instaNotes: any[] = [];
  searchItem: string = '';
  searchTag: string = '';

  searchIcon = faSearch;
  closeIcon = faClose;
  editIcon = faEdit;
  deleteIcon = faClose;
  setSearch = false;
  tags: string[] = [];
  // latestPost: SharedData = {
  //   addNewData: [],
  //   editID: '',
  // };

  addedLinks: any[] = [];
  addedNote = '';
  addedLink = '';
  notesData: any[] = [];

  ngOnChanges() {
    this.getLocalStorage();
    if (!this.isObjectEmpty(this.sentrecentPost)) {
      this.checkExistingPost(this.sentrecentPost.postid);
      this.instaNotes.push(this.sentrecentPost);
      this.setLocalStorage();
    }
    this.sortedPost();
    this.filteringTags();
  }

  ngOnInit() {
    // this.getLocalStorage();
  }

  checkExistingPost(postid: any) {
    this.instaNotes = this.instaNotes.filter((item) => {
      if (item.postid !== postid) {
        return item;
      }
    });
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }

  getLocalStorage() {
    const localStorageData = localStorage.getItem('mainData');
    this.instaNotes = localStorageData
      ? JSON.parse(localStorageData)
      : this.instaNotes;
    this.searchItem = '';
  }

  setTagToNull() {
    this.searchTag = '';
    this.setNoPostSelected();
  }

  setLocalStorage() {
    localStorage.setItem('mainData', JSON.stringify(this.instaNotes));
  }

  // ngOnInit(): void {
  //   this.getLatestData();
  //   this.sortedPost();
  // }

  // getLatestData() {
  //   this.sharedService.currentData.subscribe((data) => {
  //     this.latestPost = data;
  //   });
  // }

  addNewPost() {
    const hometoAppObj = {
      postId: 'newpost',
      isEdit: true,
    };
    this.homeToApp.emit(hometoAppObj);
    this.searchItem = '';
  }

  editPost(postId: any) {
    const hometoAppObj = {
      postId: postId,
      isEdit: true,
    };
    this.homeToApp.emit(hometoAppObj);
  }

  showPost(postId: any) {
    const hometoAppObj = {
      postId: postId,
      isEdit: false,
    };
    this.homeToApp.emit(hometoAppObj);
  }

  deletePost(postId: any) {
    const filteredArray = this.instaNotes.filter((item) => {
      if (item.postid !== postId) {
        return item;
      }
    });

    this.instaNotes = filteredArray;
    this.setLocalStorage();
    this.tags = [];
    this.filteringTags();
    const hometoAppObj = {
      postId: '',
      isEdit: false,
    };
    this.homeToApp.emit(hometoAppObj);
  }

  filteringTags() {
    for (const obj of this.instaNotes) {
      const tagArray: string[] = obj.postKeywords;
      for (const tag of tagArray) {
        if (!this.tags.includes(tag)) {
          this.tags.push(tag);
        }
      }
    }
  }

  sortedPost() {
    this.instaNotes.sort(
      (a: any, b: any) =>
        new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
    );
  }

  setSearchStatus() {
    this.setSearch = !this.setSearch;
  }

  setNoPostSelected() {
    const hometoAppObj = {
      postId: '',
      isEdit: false,
    };
    this.homeToApp.emit(hometoAppObj);
  }

  filterTag(tag: string) {
    // this.getLocalStorage();
    this.searchTag = tag;
    this.setNoPostSelected();
  }

  joinKeywords(keywords: any) {
    let stringKey = '';
    keywords.forEach((item: any) => {
      stringKey += item.toLowerCase();
    });
    return stringKey;
  }

  searchPost() {
    if (this.searchTag !== '') {
      return this.instaNotes.filter((item) => {
        return this.joinKeywords(item.postKeywords).includes(this.searchTag);
      });
    }
    if (this.searchItem.trim() === '') {
      if (
        this.activeDashBoardMenu !== '' &&
        this.activeDashBoardMenu !== 'All Post'
      ) {
        return this.instaNotes.filter((item) => {
          return item.postCategory === this.activeDashBoardMenu;
        });
      } else {
        return this.instaNotes;
      }
    } else {
      return this.instaNotes.filter((item) => {
        return (
          item.postTitle
            .toLowerCase()
            .includes(this.searchItem.toLowerCase()) ||
          item.postCategory
            .toLowerCase()
            .includes(this.searchItem.toLowerCase()) ||
          this.joinKeywords(item.postKeywords).includes(
            this.searchItem.toLowerCase()
          )
        );
      });
    }
  }
}
