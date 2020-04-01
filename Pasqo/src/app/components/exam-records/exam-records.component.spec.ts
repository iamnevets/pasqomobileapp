import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRecordsComponent } from './exam-records.component';

describe('ExamRecordsComponent', () => {
  let component: ExamRecordsComponent;
  let fixture: ComponentFixture<ExamRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
