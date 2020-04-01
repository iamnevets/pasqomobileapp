import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashQuizComponent } from './flash-quiz.component';

describe('FlashQuizComponent', () => {
  let component: FlashQuizComponent;
  let fixture: ComponentFixture<FlashQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
