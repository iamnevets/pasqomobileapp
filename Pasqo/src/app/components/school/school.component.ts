import { Router } from '@angular/router';
import { SchoolService } from './school.service';
import { Component, OnInit } from '@angular/core';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { School } from 'src/app/models/school';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  schools: School[] = [];
  schoolFilter: School = {
    Id: null,
    Name: '',
    Location: '',
    NumberOfUsers: null
  };
  pageNumber = 1;

  constructor(private schoolService: SchoolService, private router: Router) {}

  ngOnInit() {
    this.getSchools();
  }

  createSchool() {
    this.router.navigateByUrl('schoolform');
  }

  updateSchool(id: number) {
    this.router.navigateByUrl('schoolform/' + id);
  }

  getSchools() {
    this.schoolService.getSchools().subscribe(response => {
      if (response.Success) {
        this.schools = response.Data;
      }
    });
  }

  deleteSchool(id: number) {
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
        this.schoolService.delete(id).subscribe(response => {
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
}
