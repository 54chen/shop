import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User,Role } from 'src/app/_models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  usernameError: boolean = false;
  passwordError: boolean = false;
  message: string = "";
  loginForm!: FormGroup;
  subs: Subscription = new Subscription();

  constructor(        
    public authService: AuthService, 
    public router: Router) {
  }
 
  ngOnInit() {
      this.loginForm = new FormGroup({
        username: new FormControl('',[Validators.required, Validators.minLength(4)]),
        password: new FormControl('',[Validators.required, Validators.minLength(8)])
      });
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }


  onSubmit() {
    if (this.loginForm.value) {
      let user:User = this.loginForm.value as User
      this.subs.add(this.authService.login(user.username, user.password).subscribe(ret=>{
        if (!ret) {
          this.message = "Username and Password are not matched!"
        } else {
          this.message = "";
        }
        let url = "/admin";
        if (this.authService.userValue?.role == Role.ROLE_CUSTOMER) {
          url = "/cart";
        }
        this.router.navigate([url]);
      }));
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}