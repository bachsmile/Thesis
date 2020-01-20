import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFundPublicComponent } from './manage-fund-public.component';

describe('ManageFundPublicComponent', () => {
  let component: ManageFundPublicComponent;
  let fixture: ComponentFixture<ManageFundPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFundPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFundPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
