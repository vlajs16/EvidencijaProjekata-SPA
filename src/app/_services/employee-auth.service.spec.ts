/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeAuthService } from './employee-auth.service';

describe('Service: EmployeeAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeAuthService]
    });
  });

  it('should ...', inject([EmployeeAuthService], (service: EmployeeAuthService) => {
    expect(service).toBeTruthy();
  }));
});
