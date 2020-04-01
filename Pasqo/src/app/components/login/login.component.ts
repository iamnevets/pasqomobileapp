import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { HomePageService } from '../home-page/home-page.service';
import { SignUpService } from '../sign-up/sign-up.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Login = { Username: '', Password: '', RememberMe: false };

  constructor(
    private router: Router,
    private loginService: LoginService,
    private homePageService: HomePageService,
    private signUpService: SignUpService
  ) {
    this.signUpService.isSignUpPage = false;
  }

  ngOnInit() {}

  login() {
    this.loginService.logIn(this.user).subscribe(res => {
      if (res.Success) {
        // console.log(res.Data.UserRole.Name);       //Use this to check if user is a student or admin
        this.homePageService.isHome = false;
        this.router.navigateByUrl('dashboard');
        window.location.replace('dashboard');

        Swal.fire({
          title: 'Welcome',
          text: 'Successful Login',
          type: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.loginService.loggedIn = true;
        localStorage.setItem('loggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(res.Data));
      } else {
        Swal.fire({
          title: 'Failed',
          text: res.Message,
          type: 'error',
          showConfirmButton: true
        });
      }
    });
  }

  signUp() {
    this.loginService.isLoginPage = false;
    this.router.navigateByUrl('signup');
  }

  home() {
    this.loginService.isLoginPage = false;
    this.router.navigateByUrl('home');
  }
}
