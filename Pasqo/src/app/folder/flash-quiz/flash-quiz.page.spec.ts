import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlashQuizPage } from './flash-quiz.page';

describe('FlashQuizPage', () => {
  let component: FlashQuizPage;
  let fixture: ComponentFixture<FlashQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlashQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
