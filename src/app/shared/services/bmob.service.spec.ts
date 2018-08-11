import { TestBed, inject } from '@angular/core/testing';

import { BmobService } from './bmob.service';

describe('BmobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BmobService]
    });
  });

  it('should be created', inject([BmobService], (service: BmobService) => {
    expect(service).toBeTruthy();
  }));
});
