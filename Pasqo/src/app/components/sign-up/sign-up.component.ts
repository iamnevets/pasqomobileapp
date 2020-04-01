import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { School } from 'src/app/models/school';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { SchoolService } from '../school/school.service';
import Swal from 'sweetalert2';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formGroup: FormGroup;
  schools: School[];
  roles: Role[];
  role: Role;
  UserRoleId: number;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private schoolService: SchoolService,
    private signUpService: SignUpService
  ) {
    this.signUpService.isSignUpPage = true;
  }

  ngOnInit() {
    this.userForm();
    this.getSchools();
    this.getRoles();
  }

  userForm() {
    this.formGroup = this.formBuilder.group({
      // Id: this.formBuilder.control('', Validators.required),
      Name: this.formBuilder.control('', Validators.required),
      UserName: this.formBuilder.control('', Validators.required),
      Email: this.formBuilder.control('', Validators.required),
      PhoneNumber: this.formBuilder.control('', Validators.required),
      SchoolId: this.formBuilder.control('', Validators.required),
      UserRoleId: this.formBuilder.control('', Validators.required),
      Password: this.formBuilder.control('', Validators.required),
      ConfirmPassword: this.formBuilder.control('', Validators.required)
    });
  }

  createUser() {
    const data: User = this.formGroup.value;
    data.UserRoleId = this.UserRoleId;
    console.log(data.UserRoleId);
    this.userService.createOrUpdateUser(data).subscribe( response => {
      if (response.Success) {
        this.router.navigateByUrl('login');

        Swal.fire({
          title: 'Successful',
          text: 'Signed Up',
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

  getRoles() {
    this.userService.getRoles().subscribe( response => {
      if ( response.Success) {
        this.roles = response.Data;
        this.role = this.roles.find(x => x.Name === 'Student');
        this.UserRoleId = this.role.Id;
        console.log(this.role.Id);
      }
    });
  }

  getSchools() {
    this.schoolService.getSchools().subscribe( response => {
      if (response.Success) {
        this.schools = response.Data;
      }
    });
  }

}
