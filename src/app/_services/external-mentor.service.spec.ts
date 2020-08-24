/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExternalMentorService } from './external-mentor.service';

describe('Service: ExternalMentor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalMentorService]
    });
  });

  it('should ...', inject([ExternalMentorService], (service: ExternalMentorService) => {
    expect(service).toBeTruthy();
  }));
});
