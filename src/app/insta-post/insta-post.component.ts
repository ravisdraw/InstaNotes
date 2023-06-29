import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-insta-post',
  templateUrl: './insta-post.component.html',
  styleUrls: ['./insta-post.component.css'],
})
export class InstaPostComponent implements OnInit, OnChanges {
  @Input() postId: any;

  instaID = '';

  constructor(private sanitizer: DomSanitizer) {}

  commonURL = 'https://www.instagram.com/p/Ctq5NkItF7A/embed/';

  sanitizeUrl(): SafeResourceUrl {
    var url = `https://www.instagram.com/p/${this.instaID}/embed/`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnChanges() {
    this.instaID = this.postId;
  }

  ngOnInit(): void {}
}
