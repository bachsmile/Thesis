import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLeftSalesComponent } from './menu-left-sales.component';

describe('MenuLeftSalesComponent', () => {
  let component: MenuLeftSalesComponent;
  let fixture: ComponentFixture<MenuLeftSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLeftSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLeftSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
