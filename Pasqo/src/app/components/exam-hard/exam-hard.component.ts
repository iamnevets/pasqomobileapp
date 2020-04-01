import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam';
import { Router } from '@angular/router';
import { ExamService } from '../exam/exam.service';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { ExamRecordsService } from '../exam-records/exam-records.service';
import { ExamRecord } from 'src/app/models/exam-record';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-exam-hard',
  templateUrl: './exam-hard.component.html',
  styleUrls: ['./exam-hard.component.css']
})
export class ExamHardComponent implements OnInit {
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

  exams: Exam[] = [];
  timerHour = [1, 2, 3];
  timerMins = [30, 45, 59];
  hourCountdown: number;
  minsCountdown: number;
  examRecords: ExamRecord[] = [];

  faClock = faClock;

  constructor(
    private router: Router,
    private examService: ExamService,
    private examRecordsService: ExamRecordsService
  ) {}

  ngOnInit() {
    this.getAllExams();

    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    this.getAllExamRecords(currentUser.Id);

    this.hourCountdown = 0;
    this.minsCountdown = 0;
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
        this.examRecords = allExamRecords.filter(
          x => x.ExamType === 'examination'
        );
        localStorage.setItem('examrecords', JSON.stringify(response.Data));
      }
    });
  }

  getBestScore(id: number) {
    const allExamRecordsForCurrentExam: ExamRecord[] = this.examRecords.filter(
      x => x.ExamId === id
    );
    let currentBestScore = 0;
    allExamRecordsForCurrentExam.forEach(record => {
      if (record.Score > currentBestScore) {
        currentBestScore = record.Score;
      }
    });

    return currentBestScore;
  }
  getNumberOfAttempts(id: number) {
    const allExamRecordsForCurrentExam: ExamRecord[] = this.examRecords.filter(
      x => x.ExamId === id
    );

    return allExamRecordsForCurrentExam.length;
  }
  getTotalNumberOfQuestions(id: number) {
    return this.exams.find(x => x.Id === id).numOfQuestions;
  }

  getBestTime(id: number) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = this.examRecords.length - 1; i >= 0; i--) {
      if (this.examRecords[i].ExamId === id) {
        return this.examRecords[i].TimeTaken;
      }
    }
    return '';
  }

  onSelectHour(val: number) {
    this.hourCountdown = val;
  }
  onSelectMins(val: number) {
    this.minsCountdown = val;
  }
  practice(id: number, examState = '') {
    this.router.navigate([
      '/examview/' + id,
      {
        previous: 'examhard',
        examState,
        hourCountdown: this.hourCountdown,
        minsCountdown: this.minsCountdown
      }
    ]);
  }
}
