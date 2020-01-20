import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Load1Component } from './load1.component';

describe('Load1Component', () => {
  let component: Load1Component;
  let fixture: ComponentFixture<Load1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Load1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Load1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
