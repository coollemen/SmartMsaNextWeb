import { TestBed, inject } from '@angular/core/testing';

import { DutyRosterService } from './duty-roster.service';

describe('DutyRosterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DutyRosterService]
    });
  });

  it('should be created', inject([DutyRosterService], (service: DutyRosterService) => {
    expect(service).toBeTruthy();
  }));
});
