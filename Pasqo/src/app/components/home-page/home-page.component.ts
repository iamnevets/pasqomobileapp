import {
  faQuestionCircle,
  faSignOutAlt,
  faHeart,
  faEnvelope,
  faPhone,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import Swal from 'sweetalert2';
import { SignUpService } from '../sign-up/sign-up.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;
  faSignOutAlt = faSignOutAlt;
  faHeart = faHeart;
  faHome = faHome;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faInstagram = faInstagram;

  constructor(private router: Router, private loginService: LoginService, private signUpService: SignUpService) {
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

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  logout() {
    Swal.fire({
      title: 'Confirm Logout',
      text: '',
      type: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#40844e'
    }).then(result => {
      if (result.value) {
        this.loginService.logOut().subscribe(res => {
          if (res.Success) {
            this.loginService.loggedIn = false;
            localStorage.setItem('loggedIn', JSON.stringify(false));
            this.router.navigateByUrl('home');
          }
        });
      }
    });
  }
}
