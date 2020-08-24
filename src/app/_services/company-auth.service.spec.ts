/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyAuthService } from './company-auth.service';

describe('Service: CompanyAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyAuthService]
    });
  });

  it('should ...', inject([CompanyAuthService], (service: CompanyAuthService) => {
    expect(service).toBeTruthy();
  }));
});
