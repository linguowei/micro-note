import { TestBed, inject } from '@angular/core/testing';

import { DropdownMenuListService } from './dropdown-menu-list.service';

describe('DropdownMenuListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DropdownMenuListService]
    });
  });

  it('should be created', inject([DropdownMenuListService], (service: DropdownMenuListService) => {
    expect(service).toBeTruthy();
  }));
});
