/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScientificAreaService } from './scientific-area.service';

describe('Service: ScientificArea', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScientificAreaService]
    });
  });

  it('should ...', inject([ScientificAreaService], (service: ScientificAreaService) => {
    expect(service).toBeTruthy();
  }));
});
