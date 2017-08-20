import { TestBed, inject } from '@angular/core/testing';

import { MsgService } from './msg.service';

describe('MsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsgService]
    });
  });

  it('should be created', inject([MsgService], (service: MsgService) => {
    expect(service).toBeTruthy();
  }));
});
