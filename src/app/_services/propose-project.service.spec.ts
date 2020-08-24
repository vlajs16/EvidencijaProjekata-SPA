/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProposeProjectService } from './propose-project.service';

describe('Service: ProposeProject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProposeProjectService]
    });
  });

  it('should ...', inject([ProposeProjectService], (service: ProposeProjectService) => {
    expect(service).toBeTruthy();
  }));
});
