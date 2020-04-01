import { TestBed } from '@angular/core/testing';

import { LoadingSreenService } from './loading-sreen.service';

describe('LoadingSreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingSreenService = TestBed.get(LoadingSreenService);
    expect(service).toBeTruthy();
  });
});
