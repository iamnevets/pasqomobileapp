import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlashQuizPageRoutingModule } from './flash-quiz-routing.module';

import { FlashQuizPage } from './flash-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlashQuizPageRoutingModule
  ],
  declarations: [FlashQuizPage]
})
export class FlashQuizPageModule {}
