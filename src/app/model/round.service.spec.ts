import { TestBed, inject } from '@angular/core/testing';

import { RoundService } from './round.service';

describe('RoundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoundService]
    });
  });

  it('should ...', inject([RoundService], (service: RoundService) => {
    expect(service).toBeTruthy();
  }));
});
