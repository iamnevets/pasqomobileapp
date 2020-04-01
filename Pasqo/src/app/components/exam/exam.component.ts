import { ExamService } from './exam.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Exam } from 'src/app/models/exam';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  isStudent = false;
  isRootAdmin = false;

  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  exams: Exam[] = [];
  examFilter: any = {
    Id: null,
    Title: '',
    SchoolId: null,
    School: {Id: null, Name: ''},
    ProgrammeId: null,
    Programme: {Id: null, Name: ''},
    CourseId: null,
    Course: {Id: null, Name: ''},
    Year: ''
  };
  pageNumber = 1;

  constructor(private router: Router, private examService: ExamService) { }

  ngOnInit() {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    if (currentUser.UserRole.Name === 'Student') {
      this.isStudent = true;
    }
    if (currentUser.Name === 'Administrator') {
      this.isRootAdmin = true;
    }

    this.getAllExams();
  }

  createExam() {
    this.router.navigateByUrl('examform');
  }

  viewExam(id: number) {
    this.router.navigate(['/examview/' + id, {previous: 'exams'}]);
  }

  updateExam(id: number) {
    this.router.navigateByUrl('examform/' + id);
  }

  getAllExams() {
    this.examService.getAllExams().subscribe(response => {
      if (response.Success) {
        this.exams = response.Data;
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
        this.examService.delete(id).subscribe(response => {
          if (response.Success) {
            this.ngOnInit();

            Swal.fire({
              title: 'Successful',
              text: 'Exam deleted',
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
