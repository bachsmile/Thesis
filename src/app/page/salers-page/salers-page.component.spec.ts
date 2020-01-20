import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalersPageComponent } from './salers-page.component';

describe('SalersPageComponent', () => {
  let component: SalersPageComponent;
  let fixture: ComponentFixture<SalersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
