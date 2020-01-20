import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySallerManagementComponent } from './category-saller-management.component';

describe('CategorySallerManagementComponent', () => {
  let component: CategorySallerManagementComponent;
  let fixture: ComponentFixture<CategorySallerManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySallerManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySallerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
