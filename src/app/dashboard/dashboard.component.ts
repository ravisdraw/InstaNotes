import { Component } from '@angular/core';

import { faPaintBrush, faAppleAlt, faMoneyCheckDollar, faBookOpenReader, faComputer, faUser  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  paintBrush = faPaintBrush;
  apple = faAppleAlt;
  money = faMoneyCheckDollar;
  book = faBookOpenReader;
  ai = faComputer;
  profile = faUser;
}
