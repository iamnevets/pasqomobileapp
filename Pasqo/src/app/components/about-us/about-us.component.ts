import { Component, OnInit } from '@angular/core';
import {
  faEnvelope,
  faPhone,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { HomePageService } from '../home-page/home-page.service';
import { LoginService } from '../login/login.service';
import { SignUpService } from '../sign-up/sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faHeart = faHeart;

  constructor(
    private homePageService: HomePageService,
    private loginService: LoginService,
    private signUpService: SignUpService,
    private router: Router
  ) {
    this.homePageService.isHome = true;
    this.loginService.isLoginPage = false;
    this.signUpService.isSignUpPage = false;
  }

  ngOnInit() {}

  about() {
    this.router.navigateByUrl('about');
  }
  contact() {
    this.router.navigateByUrl('contact');
  }

  onClickWho() {
    this.router.navigate(['/about'], { fragment: 'who'});
  }
  onClickWhat() {
    this.router.navigate(['/about'], { fragment: 'what'});
  }
  onClickHow() {
    this.router.navigate(['/about'], { fragment: 'how'});
  }

}
