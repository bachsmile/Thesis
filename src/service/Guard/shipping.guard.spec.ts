import { TestBed, async, inject } from '@angular/core/testing';

import { ShippingGuard } from './shipping.guard';

describe('ShippingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShippingGuard]
    });
  });

  it('should ...', inject([ShippingGuard], (guard: ShippingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
