import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Note } from '../shared/app.const';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() receivedPostId: any;
  @Output() emittedPostId = new EventEmitter<any>();

  addedLinks: any[] = [];
  addedNote = '';
  addedLink = '';
  // notesData: any[] = [];
  postTitle = '';
  postNotes = '';
  postLinks: any = [];
  instaNotes: any[] = [];

  constructor(private sharedServices: SharedService) {}

  ngOnChanges() {
    this.emitPostId();
    this.setPostNotes();
  }
  
  ngOnInit(): void {}
  
  setPostNotes(){
    const existingLocalData = localStorage.getItem('mainData');
    this.instaNotes  = existingLocalData ? JSON.parse(existingLocalData) : this.instaNotes;
    if(this.instaNotes) {
      this.instaNotes.map(item => {
        if(item.postid===this.receivedPostId) {
          this.postTitle = item.postTitle,
          this.postNotes = item.postNotes,
          this.postLinks = [...item.postLinks]
        }
      })
    }
  }

  addLink() {
    this.addedLinks.push(this.addedLink);
  }

  deleteLink(index: any) {
    this.addedLinks.splice(index, 1);
  }

  // saveNotes() {
  //   const notes: Note = {
  //     postid: this.receivedPostId,
  //     postNotes: this.addedNote,
  //     noteLinks: this.addedLinks,
  //   };
  //   this.notesData.push(notes);
  //   localStorage.setItem('notesData', JSON.stringify(this.notesData));
  //   this.sharedServices.showSuccess('Notes Added Successfully');
  // }

  emitPostId() {
    this.emittedPostId.emit(this.receivedPostId);
  }

  // getLocalStorage() {
  //   const localStorageData = localStorage.getItem('notesData');
  //   this.notesData = localStorageData
  //     ? JSON.parse(localStorageData)
  //     : this.notesData;
  // }
}
