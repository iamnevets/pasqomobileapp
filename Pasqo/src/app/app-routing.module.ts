import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, ExtraOptions  } from '@angular/router';

import { ExamPracticeComponent } from './components/exam-practice/exam-practice.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ExamFormComponent } from './components/exam/exam-form/exam-form.component';
import { ExamComponent } from './components/exam/exam.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CourseFormComponent } from './components/course/course-form/course-form.component';
import { CourseComponent } from './components/course/course.component';
import { ProgrammeFormComponent } from './components/programme/programme-form/programme-form.component';
import { ProgrammeComponent } from './components/programme/programme.component';
import { SchoolFormComponent } from './components/school/school-form/school-form/school-form.component';
import { SchoolComponent } from './components/school/school.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionFormComponent } from './components/question/question-form/question-form.component';
import { ExamViewComponent } from './components/exam/exam-view/exam-view.component';
import { FeaturesComponent } from './components/features/features.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ExamHardComponent } from './components/exam-hard/exam-hard.component';
import { FlashQuizComponent } from './components/flash-quiz/flash-quiz.component';
import { ExamRecordsComponent } from './components/exam-records/exam-records.component';
import { ExamRecordViewComponent } from './components/exam-records/exam-record-view/exam-record-view.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ReadMessageComponent } from './components/messages/read-message/read-message.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'features', component: FeaturesComponent},
  { path: 'about', component: AboutUsComponent},
  { path: 'contact', component: ContactUsComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
  { path: 'users', component: UserComponent, canActivate: [AuthGuardService]},
  { path: 'userform', component: UserFormComponent, canActivate: [AuthGuardService]},
  { path: 'userform/:id', component: UserFormComponent, canActivate: [AuthGuardService]},
  { path: 'schools', component: SchoolComponent, canActivate: [AuthGuardService]},
  { path: 'schoolform', component: SchoolFormComponent, canActivate: [AuthGuardService]},
  { path: 'schoolform/:id', component: SchoolFormComponent, canActivate: [AuthGuardService]},
  { path: 'programmes', component: ProgrammeComponent, canActivate: [AuthGuardService]},
  { path: 'programmeform', component: ProgrammeFormComponent, canActivate: [AuthGuardService]},
  { path: 'programmeform/:id', component: ProgrammeFormComponent, canActivate: [AuthGuardService]},
  { path: 'courses', component: CourseComponent, canActivate: [AuthGuardService]},
  { path: 'courseform', component: CourseFormComponent, canActivate: [AuthGuardService]},
  { path: 'courseform/:id', component: CourseFormComponent, canActivate: [AuthGuardService]},
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService]},
  { path: 'readmessage/:id', component: ReadMessageComponent, canActivate: [AuthGuardService]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'exams', component: ExamComponent, canActivate: [AuthGuardService]},
  { path: 'examform', component: ExamFormComponent, canActivate: [AuthGuardService]},
  { path: 'examform/:id', component: ExamFormComponent, canActivate: [AuthGuardService]},
  { path: 'examview/:id', component: ExamViewComponent, canActivate: [AuthGuardService]},
  { path: 'questionform', component: QuestionFormComponent, canActivate: [AuthGuardService]},
  { path: 'questionform/:id', component: QuestionFormComponent, canActivate: [AuthGuardService]},
  { path: 'exampractice', component: ExamPracticeComponent, canActivate: [AuthGuardService]},
  { path: 'examhard', component: ExamHardComponent, canActivate: [AuthGuardService]},
  { path: 'flashquiz', component: FlashQuizComponent, canActivate: [AuthGuardService]},
  { path: 'examrecord', component: ExamRecordsComponent, canActivate: [AuthGuardService]},
  { path: 'examrecordview/:id', component: ExamRecordViewComponent, canActivate: [AuthGuardService]},
  
  {
    path: '',
    redirectTo: 'folder/Home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
