import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNowWhiteComponent } from './button-now-white.component';

describe('ButtonNowWhiteComponent', () => {
  let component: ButtonNowWhiteComponent;
  let fixture: ComponentFixture<ButtonNowWhiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonNowWhiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonNowWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
