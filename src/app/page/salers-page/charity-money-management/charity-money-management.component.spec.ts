import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityMoneyManagementComponent } from './charity-money-management.component';

describe('CharityMoneyManagementComponent', () => {
  let component: CharityMoneyManagementComponent;
  let fixture: ComponentFixture<CharityMoneyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityMoneyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityMoneyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
