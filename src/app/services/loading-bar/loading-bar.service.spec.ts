import { TestBed, inject } from '@angular/core/testing';

import { LoadingBarService } from './loading-bar.service';

describe('LoadingBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingBarService]
    });
  });

  it('should be created', inject([LoadingBarService], (service: LoadingBarService) => {
    expect(service).toBeTruthy();
  }));
});
