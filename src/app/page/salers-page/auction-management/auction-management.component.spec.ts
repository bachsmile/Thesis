import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionManagementComponent } from './auction-management.component';

describe('AuctionManagementComponent', () => {
  let component: AuctionManagementComponent;
  let fixture: ComponentFixture<AuctionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
