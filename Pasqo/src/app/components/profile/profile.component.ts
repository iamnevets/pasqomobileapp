import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { UserService } from './../user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  faChevronLeft = faChevronLeft;

  accountInfoForm: FormGroup;
  changePasswordForm: FormGroup;
  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.user.Id;
    console.log(id);

    this.accountInfoFormPatch(id);

    this.accountInfo();
    this.changePassword();
  }

  accountInfo() {
    this.accountInfoForm = this.formBuilder.group({
      Id: new FormControl(),
      Name: this.formBuilder.control('', Validators.required),
      UserName: this.formBuilder.control('', Validators.required),
      Email: this.formBuilder.control('', Validators.required),
      PhoneNumber: this.formBuilder.control('', Validators.required),
      SchoolId: this.formBuilder.control(
        this.user.SchoolId,
        Validators.required
      ),
      UserRoleId: this.formBuilder.control(
        this.user.UserRoleId,
        Validators.required
      )
    });
  }

  changePassword() {
    this.changePasswordForm = this.formBuilder.group({
      OldPassword: this.formBuilder.control('', Validators.required),
      NewPassword: this.formBuilder.control('', Validators.required),
      ConfirmPassword: this.formBuilder.control('', Validators.required)
    });
  }

  accountInfoFormPatch(id: string) {
    this.userService.getUserDetails(id).subscribe(response => {
      if (response.Data.Id === id) {
        this.accountInfoForm.patchValue(response.Data);
      }
    });
  }

  updateAccount() {
    const data: User = this.accountInfoForm.value;
    this.userService.createOrUpdateUser(data).subscribe(response => {
      if (response.Success) {
        Swal.fire({
          title: 'Successful',
          text: 'Account updated',
          type: 'success',
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        Swal.fire({
          title: 'Failed',
          text: response.Message,
          type: 'error',
          showConfirmButton: true,
          confirmButtonColor: '#40844e'
        });
      }
    });
  }

  updatePassword() {
    const data = this.changePasswordForm.value;
    this.userService.changePassword(data).subscribe(response => {
      if (response.Success) {
        Swal.fire({
          title: 'Successful',
          text: 'Password updated',
          type: 'success',
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        Swal.fire({
          title: 'Failed',
          text: response.Message.includes('Incorrect')
            ? 'Old password is incorrect'
            : response.Message,
          type: 'error',
          showConfirmButton: true,
          confirmButtonColor: '#40844e'
        });
      }
    });
  }

  back() {
    this.router.navigateByUrl('dashboard');
  }

}
