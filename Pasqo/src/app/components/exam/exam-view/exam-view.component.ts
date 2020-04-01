import { QuestionService } from './../../question/question.service';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import {
  faEdit,
  faChevronLeft,
  faTrashAlt,
  faPlusSquare,
  faShareSquare,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { ExamPracticeService } from '../../exam-practice/exam-practice.service';
import { ExamRecordsService } from '../../exam-records/exam-records.service';
import { ExamRecord } from 'src/app/models/exam-record';
import { SelectedAnswer } from 'src/app/models/selected-answer';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.css']
})
export class ExamViewComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faChevronLeft = faChevronLeft;
  faPlusSquare = faPlusSquare;
  faShareSquare = faShareSquare;
  faClock = faClock;

  selectedAnswers: SelectedAnswer[] = [];
  questions: Question[] = [];
  questionsLength: number;
  examRecord: ExamRecord;
  currentExamRecord: ExamRecord;
  examRecords: ExamRecord[] = [];
  correctAnswerQuestionId: number;
  showCorrectAnswer: boolean;
  examId: number;
  currentUserId: string;
  examState: string;
  previousPage: string;
  isStudent = false;
  isRetake = false;
  totalNumberOfQuestions = 0;
  hourCountdown = 0;
  minsCountdown = 45;
  secondsCountdown = 60;
  interval;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private examPracticeService: ExamPracticeService,
    private examRecordsService: ExamRecordsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get the examId from the url, to help load the right questions with this examId
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.examId = id;
      this.getAllQuestions(id);
    }

    // Get the hour/Minutes values to set the timer for countdown
    const hourCountdown = +this.activatedRoute.snapshot.paramMap.get(
      'hourCountdown'
    );
    if (hourCountdown) {
      this.hourCountdown = hourCountdown;
    }
    const minsCountdown = +this.activatedRoute.snapshot.paramMap.get(
      'minsCountdown'
    );
    if (minsCountdown) {
      this.minsCountdown = minsCountdown;
    }
    if (hourCountdown && !minsCountdown) {
      this.minsCountdown = 0;
    }
    this.startTimer();

    // Find out the previous page to know what to display and what not
    const previousPage = this.activatedRoute.snapshot.paramMap.get('previous');
    if (previousPage) {
      this.previousPage = previousPage;
    }

    /* Find out if user is taking exam for the first time to know whether or not to
       even try to resume answers */
    const examState = this.activatedRoute.snapshot.paramMap.get('examState');
    if (examState) {
      this.examState = examState;
    }

    // Find out the role of the current user for display purposes
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    this.currentUserId = currentUser.Id;
    if (currentUser.UserRole.Name === 'Student') {
      this.isStudent = true;
    }

    // Get exam records from local storage, and set the most recent one to currentExamRecords
    const examRecords: ExamRecord[] = JSON.parse(
      localStorage.getItem('examrecords')
    );
    this.examRecords = examRecords.filter(x => x.ExamId === this.examId);
    this.currentExamRecord = this.examRecords.pop();
  }

  // Function to begin countdown, on examination (exam-hard)
  startTimer() {
    this.interval = setInterval(() => {
      if (this.secondsCountdown > 0) {
        this.secondsCountdown--;
      } else {
        if (this.minsCountdown > 0) {
          this.secondsCountdown = 60;
          this.minsCountdown--;
        } else {
          if (this.hourCountdown > 0) {
            this.minsCountdown = 59;
            this.secondsCountdown = 60;
            this.hourCountdown--;
          }
        }
      }
    }, 1000);
  }

  // Function to display answers to questions that user started but didn't complete
  resumedAnswer(questionId: number, answer: string) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.currentExamRecord.SelectedAnswers.length; i++) {
      if (
        questionId === this.currentExamRecord.SelectedAnswers[i].QuestionId &&
        answer === this.currentExamRecord.SelectedAnswers[i].SelectedAnswer
      ) {
        this.selectedAnswer(questionId, answer);
        return true;
      }
    }
  }

  // A function to save user's selected answers
  selectedAnswer(id: number, selectedAnswer: string) {
    for (let i = 0; i < this.questionsLength; i++) {
      if (id === this.selectedAnswers[i].QuestionId) {
        this.selectedAnswers[i].SelectedAnswer = selectedAnswer;
        // console.log(this.selectedAnswers[i].SelectedAnswer);
      }
    }
  }

  // A click-event function to set and show/hide correct answer
  showAnswer(questionId: number) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].Id === questionId) {
        this.showCorrectAnswer = !this.showCorrectAnswer;
        this.correctAnswerQuestionId = questionId;
      }
    }
  }

  // Function to load the questions
  getAllQuestions(examId: number) {
    this.questionService.getAllQuestions(examId).subscribe(response => {
      if (response.Success) {
        this.questions = response.Data;
        this.questionsLength = this.questions.length;

        // Set the questionId's which will be used to save a selected answer uniquely
        for (let i = 0; i < this.questionsLength; i++) {
          const newSelectedAnswer: SelectedAnswer = {
            QuestionId: this.questions[i].Id,
            SelectedAnswer: ''
          };
          this.selectedAnswers.push(newSelectedAnswer);
        }

        // Check to see if user is retaking exam(complete) or resuming exam(incomplete)
        if (this.isStudent === true && this.examState !== 'start') {
          if (
            this.currentExamRecord.NumberOfQuestionsAnswered <
            this.questions.length
          ) {
            this.isRetake = false;
          } else {
            this.isRetake = true;
          }
        }
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

  // Functions for an admin to be able to add/update/delete questions while previewing an exam
  addQuestion() {
    this.router.navigate(['/questionform', { examid: this.examId }]);
  }
  updateQuestion(id: number) {
    this.router.navigateByUrl('questionform/' + id);
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
        this.questionService.delete(id).subscribe(response => {
          if (response.Success) {
            this.ngOnInit();

            Swal.fire({
              title: 'Successful',
              text: 'Qustion deleted',
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

  // Function to get the type of exam, to help differentiate exam records
  checkExamType() {
    if (this.previousPage === 'exampractice') {
      return 'practice';
    } else if (this.previousPage === 'examhard') {
      return 'examination';
    } else {
      return 'flash-quiz';
    }
  }

  // Function to get the number of questions answered, to show on exam practice page
  numberOfQuestionsAnswered() {
    let count = 0;
    for (let i = 0; i < this.questionsLength; i++) {
      if (this.selectedAnswers[i].SelectedAnswer !== '') {
        count++;
      }
    }
    return count;
  }

  // Function to set score by evaluating selected answers
  evaluateAnswers() {
    const selectedAnswers: SelectedAnswer[] = this.selectedAnswers.filter(x => x.SelectedAnswer !== '');
    let score = 0;
    for (let i = 0; i < selectedAnswers.length; i++) {
      if (
        this.questions[i].Id === selectedAnswers[i].QuestionId &&
        this.questions[i].CorrectAnswer === this.selectedAnswers[i].SelectedAnswer
      ) {
        score++;
      }
    }
    return score;
  }

  submit() {
    clearInterval(this.interval);
    // modal to make sure user is certain they want to submit their answers
    Swal.fire({
      title: 'Confirm Submission',
      text: 'Are you sure?',
      type: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#40844e'
    }).then(result => {
      if (result.value) {
        // block to be executed if user confirms in the affirmative
        this.examRecord = {
          // Create new exam record
          Id: null,
          UserId: this.currentUserId,
          User: null,
          ExamId: this.examId,
          Exam: null,
          ExamType: this.checkExamType(),
          Score: this.evaluateAnswers(),
          TimeTaken: `0${this.hourCountdown} : ${this.minsCountdown} : ${this.secondsCountdown}`,
          SelectedAnswers: this.selectedAnswers.filter(
            x => x.SelectedAnswer !== ''
          ),
          NumberOfQuestionsAnswered: this.numberOfQuestionsAnswered(),
          TotalNumberOfQuestions: this.questionsLength
        };

        this.examRecordsService
          .createExamRecord(this.examRecord)
          .subscribe(response => {
            if (response.Success) {
              console.log(this.examRecord.TimeTaken);
              this.router.navigateByUrl('examrecordview/' + response.Data.Id);
            }
          });
      } else {
        this.startTimer();
      }
    });
  }

  back() {
    // Conditional statements to check user's role, to know which page to route BACK to
    if (this.isStudent === false) {
      this.router.navigateByUrl('exams');
    } else if (this.previousPage === 'examhard') {
      clearInterval(this.interval);

      Swal.fire({
        title: 'Confirm',
        text: 'Are you sure you wan\'t to discard your answers??',
        type: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#40844e',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Discard',
        cancelButtonText: 'Cancel'
      }).then(result => {
        if (result.value) {
          this.router.navigateByUrl(this.previousPage);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.startTimer();
        }
      });
    } else {
      // On exam practice page, check if user wants to save their answers

      // If user is continuing an exam, compare selected answers with
      // currentExamRecord.SelectedAnswersto know if user made any
      // changes before displaying modal
      let counter = 0;
      if (this.examState !== 'start') {
        // Only execute if exam state is 'resume'
        for (
          let i = 0;
          i < this.currentExamRecord.SelectedAnswers.length;
          i++
        ) {
          if (
            this.currentExamRecord.SelectedAnswers[i].SelectedAnswer ===
            this.selectedAnswers[i].SelectedAnswer
          ) {
            counter++;
          }
        }
      }
      if (
        this.numberOfQuestionsAnswered() > 0 &&
        counter !== this.numberOfQuestionsAnswered()
      ) {
        Swal.fire({
          title: 'Confirm',
          text: 'Do you want to save your answers for later?',
          type: 'warning',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: '#40844e',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Save',
          // tslint:disable-next-line: quotemark
          cancelButtonText: "Don't save"
        }).then(result => {
          if (result.value) {
            this.examRecord = {
              Id: null,
              UserId: this.currentUserId,
              User: null,
              ExamId: this.examId,
              Exam: null,
              ExamType: this.checkExamType(),
              Score: 0,
              TimeTaken: '00:39:59',
              SelectedAnswers: this.selectedAnswers.filter(
                x => x.SelectedAnswer !== ''
              ),
              NumberOfQuestionsAnswered: this.numberOfQuestionsAnswered(),
              TotalNumberOfQuestions: this.questionsLength
            };

            this.examRecordsService
              .createExamRecord(this.examRecord)
              .subscribe(response => {
                if (response.Success) {
                  this.router.navigateByUrl(this.previousPage);
                  Swal.fire({
                    title: 'Successful',
                    text: 'Answers saved',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1000
                  });
                }
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl(this.previousPage);
          }
        });
      } else {
        this.router.navigateByUrl(this.previousPage);
      }
    }
  }
}
