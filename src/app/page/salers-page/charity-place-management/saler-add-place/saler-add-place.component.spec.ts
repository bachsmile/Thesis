import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalerAddPlaceComponent } from './saler-add-place.component';

describe('SalerAddPlaceComponent', () => {
  let component: SalerAddPlaceComponent;
  let fixture: ComponentFixture<SalerAddPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalerAddPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalerAddPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
