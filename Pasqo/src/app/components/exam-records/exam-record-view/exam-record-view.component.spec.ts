import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRecordViewComponent } from './exam-record-view.component';

describe('ExamRecordViewComponent', () => {
  let component: ExamRecordViewComponent;
  let fixture: ComponentFixture<ExamRecordViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamRecordViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRecordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
