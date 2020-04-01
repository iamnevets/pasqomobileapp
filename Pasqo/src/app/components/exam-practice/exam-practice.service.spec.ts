import { TestBed } from '@angular/core/testing';

import { ExamPracticeService } from './exam-practice.service';

describe('ExamPracticeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamPracticeService = TestBed.get(ExamPracticeService);
    expect(service).toBeTruthy();
  });
});
