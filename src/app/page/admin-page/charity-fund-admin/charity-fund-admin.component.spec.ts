import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityFundAdminComponent } from './charity-fund-admin.component';

describe('CharityFundAdminComponent', () => {
  let component: CharityFundAdminComponent;
  let fixture: ComponentFixture<CharityFundAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityFundAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityFundAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
