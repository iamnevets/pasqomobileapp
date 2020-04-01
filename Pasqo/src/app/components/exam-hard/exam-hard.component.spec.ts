import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamHardComponent } from './exam-hard.component';

describe('ExamHardComponent', () => {
  let component: ExamHardComponent;
  let fixture: ComponentFixture<ExamHardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamHardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamHardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
