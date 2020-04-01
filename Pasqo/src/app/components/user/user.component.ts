import { SchoolService } from './../school/school.service';
import {
  faEye,
  faUserEdit,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { School } from 'src/app/models/school';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  faEye = faEye;
  faUserEdit = faUserEdit;
  faTrashAlt = faTrashAlt;

  users: User[] = [];
  userFilter: any = {
    Id: '',
    Name: '',
    School: { Id: null, Name: '' }
  };
  pageNumber = 1;

  constructor(
    private router: Router,
    private userService: UserService,
    private schoolService: SchoolService
  ) {}

  ngOnInit() {
    this.GetUsers();
  }

  CreateUser() {
    this.router.navigateByUrl('userform');
  }
  updateUser(id: string) {
    this.router.navigateByUrl('userform/' + id);
  }

  GetUsers() {
    this.userService.getUsers().subscribe(res => {
      if (res.Success) {
        this.users = res.Data;
      }
    });
  }

  deleteUser(id: string) {
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure?',
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#40844e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'delete it'
    }).then(result => {
      if (result.value) {
        this.userService.deleteUser(id).subscribe(response => {
          if (response.Success) {
            this.ngOnInit();

            Swal.fire({
              title: 'Successful',
              text: 'User deleted',
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
    });
  }

  // getSchools() {
  //   this.schoolService.getSchools().subscribe(res => {
  //     if (res.Success) {
  //       this.schools = res.Data;
  //     }
  //   });
  // }
}
