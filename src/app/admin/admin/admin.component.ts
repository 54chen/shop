import { Component } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  constructor(public authService: AuthService) {
  }
}
