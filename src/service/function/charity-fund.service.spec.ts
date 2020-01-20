import { TestBed } from '@angular/core/testing';

import { CharityFundService } from './charity-fund.service';

describe('CharityFundService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharityFundService = TestBed.get(CharityFundService);
    expect(service).toBeTruthy();
  });
});
