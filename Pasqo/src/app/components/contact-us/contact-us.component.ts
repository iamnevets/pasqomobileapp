import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { ContactUsService } from './contact-us.service';
import { ContactUs } from 'src/app/models/contact-us';
import Swal from 'sweetalert2';
import { School } from 'src/app/models/school';
import { SchoolService } from '../school/school.service';
import { LoginService } from '../login/login.service';
import { SignUpService } from '../sign-up/sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faHeart = faHeart;

  formGroup: FormGroup;
  schools: School[];

  constructor(
    private router: Router,
    private signUpService: SignUpService,
    private homePageService: HomePageService,
    private contactUsService: ContactUsService,
    private schoolService: SchoolService,
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {
    this.homePageService.isHome = true;
    this.loginService.isLoginPage = false;
    this.signUpService.isSignUpPage = false;
  }

  ngOnInit() {
    this.getSchools();
    this.contactForm();
  }

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

  contactForm() {
    this.formGroup = this.formBuilder.group({
      Id: this.formBuilder.control(''),
      Name: this.formBuilder.control('', Validators.required),
      Email: this.formBuilder.control('', Validators.required),
      Phone: this.formBuilder.control('', Validators.required),
      SchoolId: this.formBuilder.control('', Validators.required),
      Message: this.formBuilder.control('', Validators.required)
    });
  }

  contactUs() {
    const data: ContactUs = this.formGroup.value;
    this.contactUsService.create(data).subscribe(response => {
      if (response.Success) {
        this.ngOnInit();

        Swal.fire({
          title: 'Successful',
          text: 'Message Sent',
          type: 'success',
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        Swal.fire({
          title: 'Failed',
          text: response.Message,
          type: 'error',
          showConfirmButton: true
        });
      }
    });
  }

  getSchools() {
    this.schoolService.getSchools().subscribe(response => {
      if (response.Success) {
        this.schools = response.Data;
      }
    });
  }
}
