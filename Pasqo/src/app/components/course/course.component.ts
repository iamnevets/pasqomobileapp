import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import Swal from 'sweetalert2';
import { Course } from 'src/app/models/course';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Programme } from 'src/app/models/Programme';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  courses: Course[] = [];
  courseFilter: any = {
    Id: null,
    Name: '',
    ProgrammeId: null,
    Programme: { Id: null, Name: ''}
  };
  pageNumber = 1;

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit() {
    this.getAllCourses();
  }

  createCourse() {
    this.router.navigateByUrl('courseform');
  }

  updateCourse(id: number) {
    this.router.navigateByUrl('courseform/' + id);
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(response => {
      if (response.Success) {
        this.courses = response.Data;
      }
    });
  }

  delete(id: number) {
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
        this.courseService.delete(id).subscribe(response => {
          if (response.Success) {
            this.ngOnInit();

            Swal.fire({
              title: 'Successful',
              text: 'Course deleted',
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
