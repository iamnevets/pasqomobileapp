import { TestBed } from '@angular/core/testing';

import { ExamRecordsService } from './exam-records.service';

describe('ExamRecordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamRecordsService = TestBed.get(ExamRecordsService);
    expect(service).toBeTruthy();
  });
});
