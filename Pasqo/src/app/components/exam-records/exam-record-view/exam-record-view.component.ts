import { faChevronLeft, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamRecordsService } from '../exam-records.service';
import { ExamRecord } from 'src/app/models/exam-record';

@Component({
  selector: 'app-exam-record-view',
  templateUrl: './exam-record-view.component.html',
  styleUrls: ['./exam-record-view.component.css']
})
export class ExamRecordViewComponent implements OnInit {
  examRecord: ExamRecord = {
    Id: null,
    UserId: '',
    User: null,
    ExamId: 0,
    Exam: null,
    ExamType: null,
    Score: 0,
    TimeTaken: '',
    SelectedAnswers: null,
    NumberOfQuestionsAnswered: 0,
    TotalNumberOfQuestions: 0
  };

  faChevronLeft = faChevronLeft;
  faFileAlt = faFileAlt;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private examRecordsService: ExamRecordsService) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      console.log(id);
      this.getOneExamRecord(id);
    }
  }

  getOneExamRecord(id: number) {
    this.examRecordsService.getOneExamRecord(id).subscribe(response => {
      if (response.Success) {
        this.examRecord = response.Data;
      }
    });
  }

  back() {
    this.router.navigateByUrl('examhard');
  }

}
