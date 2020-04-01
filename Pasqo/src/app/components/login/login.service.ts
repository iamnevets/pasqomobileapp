import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { from } from 'rxjs';
import { ReturnObject } from 'src/app/models/return-object';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoginPage = false;
  loggedIn = false;
  currentUser: User;

  constructor(private http: HttpClient) {
    let isUserLoggedIn = localStorage.getItem('loggedIn');
    if (isUserLoggedIn === '') {
      isUserLoggedIn = 'false';
    }
    this.loggedIn = JSON.parse(isUserLoggedIn);

    const currentUrl = (window.location.pathname.replace('/', ''));
    if (currentUrl === 'login') {
      this.isLoginPage = true;
    }
  }

  onLoginPage() {
    return this.isLoginPage ? this.isLoginPage : false;
  }

  isLoggedIn() {
    return this.loggedIn ? this.loggedIn : false;
  }

  logIn(Data: any) {
    return this.http.post<ReturnObject>('api/account/login', Data);
  }

  logOut() {
    return this.http.get<ReturnObject>('api/account/logout');
  }
}
