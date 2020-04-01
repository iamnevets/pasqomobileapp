import { ExamPracticeService } from './exam-practice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from '../exam/exam.service';
import { Exam } from 'src/app/models/exam';
import { ExamRecordsService } from '../exam-records/exam-records.service';
import { ExamRecord } from 'src/app/models/exam-record';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-exam-practice',
  templateUrl: './exam-practice.component.html',
  styleUrls: ['./exam-practice.component.css']
})
export class ExamPracticeComponent implements OnInit {
  exams: Exam[] = [];
  examRecords: ExamRecord[] = [];
  examId: number;

  examFilter: any = {
    Id: null,
    Title: '',
    SchoolId: null,
    School: { Id: null, Name: '' },
    ProgrammeId: null,
    Programme: { Id: null, Name: '' },
    CourseId: null,
    Course: { Id: null, Name: '' },
    Year: ''
  };

  constructor(
    private router: Router,
    private examService: ExamService,
    private examRecordsService: ExamRecordsService
  ) {}

  ngOnInit() {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    this.getAllExamRecords(currentUser.Id);

    this.getAllExams();
  }

  getAllExams() {
    this.examService.getAllExams().subscribe(response => {
      if (response.Success) {
        this.exams = response.Data;
      }
    });
  }

  getAllExamRecords(userId: string) {
    this.examRecordsService.getAllExamRecords(userId).subscribe(response => {
      if (response.Success) {
        const allExamRecords: ExamRecord[] = response.Data;
        this.examRecords = allExamRecords.filter(x => x.ExamType === 'practice');
        localStorage.setItem('examrecords', JSON.stringify(response.Data));
      }
    });
  }

  practice(id: number, examState = '') {   // Use examState to know if user has taken the exam before
    if (examState === '') {
      this.router.navigate(['/examview/' + id, { previous: 'exampractice' }]);
    } else {
      this.router.navigate(['/examview/' + id, { previous: 'exampractice', examState }]);
    }
  }

  getProgressCounter(id: number) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = this.examRecords.length - 1; i >= 0; i--) {
      if (this.examRecords[i].ExamId === id) {
        return this.examRecords[i].NumberOfQuestionsAnswered > 0
          ? this.examRecords[i].NumberOfQuestionsAnswered
          : i--;
      }
    }
    return 0;
  }

}
