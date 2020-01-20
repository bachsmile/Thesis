import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityPlaceManagementComponent } from './charity-place-management.component';

describe('CharityPlaceManagementComponent', () => {
  let component: CharityPlaceManagementComponent;
  let fixture: ComponentFixture<CharityPlaceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityPlaceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityPlaceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
