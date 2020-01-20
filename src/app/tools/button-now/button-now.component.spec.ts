import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNowComponent } from './button-now.component';

describe('ButtonNowComponent', () => {
  let component: ButtonNowComponent;
  let fixture: ComponentFixture<ButtonNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
