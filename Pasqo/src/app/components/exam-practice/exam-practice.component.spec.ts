import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPracticeComponent } from './exam-practice.component';

describe('ExamPracticeComponent', () => {
  let component: ExamPracticeComponent;
  let fixture: ComponentFixture<ExamPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
