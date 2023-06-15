import { Component } from '@angular/core';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchIcon = faSearch;
  closeIcon = faClose;
  setSearch = false;

  setSearchStatus() {
    this.setSearch = !this.setSearch;
  }
}

