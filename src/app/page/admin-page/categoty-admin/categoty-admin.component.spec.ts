import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategotyAdminComponent } from './categoty-admin.component';

describe('CategotyAdminComponent', () => {
  let component: CategotyAdminComponent;
  let fixture: ComponentFixture<CategotyAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategotyAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategotyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
