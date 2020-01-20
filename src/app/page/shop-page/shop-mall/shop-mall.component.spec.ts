import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMallComponent } from './shop-mall.component';

describe('ShopMallComponent', () => {
  let component: ShopMallComponent;
  let fixture: ComponentFixture<ShopMallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopMallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopMallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
