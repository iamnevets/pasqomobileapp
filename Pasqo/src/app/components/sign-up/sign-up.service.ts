import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  isSignUpPage = false;

  constructor() {
    const currentUrl = (window.location.pathname.replace('/', ''));
    if (currentUrl === 'signup') {
      this.isSignUpPage = true;
    }
  }

  onSignUpPage() {
    return this.isSignUpPage ? this.isSignUpPage : false;
  }

}
