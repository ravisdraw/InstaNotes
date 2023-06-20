import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-insta-post',
  templateUrl: './insta-post.component.html',
  styleUrls: ['./insta-post.component.css']
})
export class InstaPostComponent implements OnInit {
  
  instaID = 'CtiX-dovegw';

  constructor(private sanitizer: DomSanitizer) {}
 
  commonURL = 'https://www.instagram.com/p/Ctq5NkItF7A/embed/';

  sanitizeUrl(): SafeResourceUrl {
    var url  = `https://www.instagram.com/p/${this.instaID}/embed/`
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  
  ngOnInit(): void {
   this.commonURL = "https://www.instagram.com/p/CauLOXop4hS/embed/?cr=1&amp;v=14&amp;wp=652&amp;rd=http%3A%2F%2F127.0.0.1%3A5501&amp;rp=%2F#%7B%22ci%22%3A0%2C%22os%22%3A159.59999999403954%2C%22ls%22%3A141.90000000596046%2C%22le%22%3A142.80000001192093%7D"
  }
}
