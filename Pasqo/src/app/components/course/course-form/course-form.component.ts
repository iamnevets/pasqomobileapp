import { ProgrammeService } from './../../programme/programme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Programme } from 'src/app/models/Programme';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  form: FormGroup;
  programmes: Programme[];

  constructor(
    private router: Router,
    private courseService: CourseService,
    private programmeService: ProgrammeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editCourse(id);
    }

    this.courseForm();
    this.getAllProgrammes();
  }

  courseForm() {
    this.form = this.formBuilder.group({
      Id: this.formBuilder.control(''),
      Name: this.formBuilder.control('', Validators.required),
      ProgrammeId: this.formBuilder.control('', Validators.required)
    });
  }

  createOrUpdateCourse() {
    const data = this.form.value;
    this.courseService.createOrUpdate(data).subscribe(response => {
      if (response.Success) {
        this.router.navigateByUrl('courses');

        Swal.fire({
          title: 'Successful',
          text: 'Course Created',
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

  editCourse(id: number) {
    this.courseService.getOneCourse(id).subscribe(response => {
      if (response.Success) {
        this.form.patchValue(response.Data);
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('courses');
  }

  getAllProgrammes() {
    this.programmeService.getAllProgrammes().subscribe(response => {
      if (response.Success) {
        this.programmes = response.Data;
      }
    });
  }

}
