import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductPageComponent } from './info-product-page.component';

describe('InfoProductPageComponent', () => {
  let component: InfoProductPageComponent;
  let fixture: ComponentFixture<InfoProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
