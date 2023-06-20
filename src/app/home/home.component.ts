import { Component, OnInit } from '@angular/core';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../shared/app.const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchIcon = faSearch;
  closeIcon = faClose;
  setSearch = false;
  tags: string[] = [];
  latestPost: any = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('instaNotes');
    if (localData) {
      this.latestPost = JSON.parse(localData);
    }
    this.sortedPost();
    this.filteringTags();
    console.log(this.tags);
    
  }

  filteringTags() {
    for(const obj of this.latestPost) {
      const tagArray:string [] = obj.postKeywords;
      for(const tag of tagArray) {
        if(!this.tags.includes(tag)) {
          this.tags.push(tag);
        }
      }
    }
  }

  sortedPost() {
    this.latestPost.sort((a:any,b:any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime());
    console.log(this.latestPost);
  }

  setSearchStatus() {
    this.setSearch = !this.setSearch;
  }
}
