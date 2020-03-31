import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlashQuizPage } from './flash-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: FlashQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlashQuizPageRoutingModule {}
