import { Component } from '@angular/core';

import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  constructor(public authService: AuthService) {
  }
}
