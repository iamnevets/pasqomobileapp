import { SchoolService } from './../../school/school.service';
import { Role } from './../../../models/role';
import { User } from './../../../models/user';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { School } from 'src/app/models/school';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  users: User[];
  roles: Role[];
  schools: School[];

  constructor(
    private router: Router,
    private userService: UserService,
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editUser(id);
    }

    this.userForm();
    this.getRoles();
    this.getSchools();
  }

  userForm() {
    this.form = this.formBuilder.group({
      Id: new FormControl(),
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

  createOrUpdateUser() {
    const data = this.form.value;
    this.userService.createOrUpdateUser(data).subscribe( response => {
      if (response.Success) {
        this.router.navigateByUrl('users');

        Swal.fire({
          title: 'Successful',
          text: 'User Created',
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

  editUser(id: string) {
    this.userService.getUserDetails(id).subscribe(response => {
      if (response.Data.Id === id) {
        this.form.patchValue(response.Data);
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('users');
  }

  getRoles() {
    this.userService.getRoles().subscribe( response => {
      if ( response.Success) {
        this.roles = response.Data;
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
