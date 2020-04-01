import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { ExamService } from '../../exam/exam.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Exam } from 'src/app/models/exam';
import { Question } from 'src/app/models/question';
import Swal from 'sweetalert2';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  exams: Exam[];
  examId: number;
  examIdForBackbutton: number;
  examTitle: string;
  formGroup: FormGroup;

  faChevronLeft = faChevronLeft;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private examService: ExamService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editQuestion(id);
    }
    const examId = +this.activatedRoute.snapshot.paramMap.get('examid');
    if (examId) {
      this.examId = examId;
      this.examIdForBackbutton = examId;
    }

    this.questionForm();
    this.getAllExams();
  }

  questionForm() {
    this.formGroup = this.formBuilder.group({
      Id: new FormControl(),
      QuestionText: this.formBuilder.control('', Validators.required),
      ExamId: this.formBuilder.control('', Validators.required),
      Answer1: this.formBuilder.control('', Validators.required),
      Answer2: this.formBuilder.control('', Validators.required),
      Answer3: this.formBuilder.control('', Validators.required),
      Answer4: this.formBuilder.control('', Validators.required),
      Answer5: this.formBuilder.control('', Validators.required),
      Answer6: this.formBuilder.control('', Validators.required),
      CorrectAnswer: this.formBuilder.control('', Validators.required)
    });
  }

  createOrUpdate() {
    const data: Question = this.formGroup.value;
    data.ExamId = this.examId;

    this.questionService.createOrUpdate(data).subscribe(response => {
      if (response.Success) {

        if (response.Message.toLowerCase() === 'created') {
          this.router.navigateByUrl('questionform');
          this.ngOnInit();
        } else {
          this.router.navigateByUrl('examview/' + this.examIdForBackbutton);
        }

        Swal.fire({
          title: 'Successful',
          text: 'Question ' + response.Message,
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

  editQuestion(id: number) {
    this.questionService.getOneQuestion(id).subscribe(response => {
      if (response.Data.Id === id) {
        this.formGroup.patchValue(response.Data);

        this.examIdForBackbutton = response.Data.ExamId;
        console.log(this.examIdForBackbutton);
      }
    });
  }

  back() {
    this.router.navigateByUrl('examview/' + this.examIdForBackbutton);
  }

  cancel() {
    this.router.navigateByUrl('exams');
  }

  getAllExams() {
    this.examService.getAllExams().subscribe(response => {
      if (response.Success) {
        this.exams = response.Data;
        this.examTitle = this.exams.find(x => x.Id === this.examId).Title;
      }
    });
  }
}
