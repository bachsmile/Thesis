import { TestBed, async, inject } from '@angular/core/testing';

import { BagGuard } from './bag.guard';

describe('BagGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BagGuard]
    });
  });

  it('should ...', inject([BagGuard], (guard: BagGuard) => {
    expect(guard).toBeTruthy();
  }));
});
