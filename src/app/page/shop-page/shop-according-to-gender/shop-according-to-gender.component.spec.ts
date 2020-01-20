import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAccordingToGenderComponent } from './shop-according-to-gender.component';

describe('ShopAccordingToGenderComponent', () => {
  let component: ShopAccordingToGenderComponent;
  let fixture: ComponentFixture<ShopAccordingToGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAccordingToGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAccordingToGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
