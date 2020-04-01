import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { SchoolService } from './../../school/school.service';
import { ProgrammeService } from './../../programme/programme.service';
import { CourseService } from './../../course/course.service';
import { ExamService } from './../exam.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam';
import { Course } from 'src/app/models/course';
import { Programme } from 'src/app/models/Programme';
import Swal from 'sweetalert2';
import { School } from 'src/app/models/school';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {
  formGroup: FormGroup;
  schools: School[];
  exams: Exam[];
  courses: Course[];
  programmes: Programme[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private examService: ExamService,
    private courseService: CourseService,
    private programmeService: ProgrammeService,
    private schoolService: SchoolService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editExam(id);
    }

    this.examForm();
    this.getSchools();
    this.getProgrammes();
    this.getCourses();
  }

  examForm() {
    this.formGroup = this.formBuilder.group({
      Id: new FormControl(),
      Title: this.formBuilder.control('', Validators.required),
      SchoolId: this.formBuilder.control('', Validators.required),
      ProgrammeId: this.formBuilder.control('', Validators.required),
      CourseId: this.formBuilder.control('', Validators.required),
      Year: this.formBuilder.control('', Validators.required)
    });
  }

  createOrUpdate() {
    const data: Exam = this.formGroup.value;
    this.examService.createOrUpdate(data).subscribe(response => {
      if (response.Success) {
        this.router.navigate(['/questionform', {examid: response.Data.Id}]);

        Swal.fire({
          title: 'Successful',
          text: 'Exam Created',
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

  editExam(id: number) {
    this.examService.getOneExam(id).subscribe(response => {
      if (response.Data.Id === id) {
        this.formGroup.patchValue(response.Data);
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('exams');
  }

  getSchools() {
    this.schoolService.getSchools().subscribe(response => {
      if (response.Success) {
        this.schools = response.Data;
      }
    });
  }

  getProgrammes() {
    this.programmeService.getAllProgrammes().subscribe(response => {
      if (response.Success) {
        this.programmes = response.Data;
      }
    });
  }

  getCourses() {
    this.courseService.getAllCourses().subscribe(response => {
      if (response.Success) {
        this.courses = response.Data;
      }
    });
  }

}
