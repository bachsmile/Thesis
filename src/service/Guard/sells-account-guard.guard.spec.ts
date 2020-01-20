import { TestBed, async, inject } from '@angular/core/testing';

import { SellsAccountGuardGuard } from './sells-account-guard.guard';

describe('SellsAccountGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellsAccountGuardGuard]
    });
  });

  it('should ...', inject([SellsAccountGuardGuard], (guard: SellsAccountGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
