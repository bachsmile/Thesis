import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignNowComponent } from './design-now.component';

describe('DesignNowComponent', () => {
  let component: DesignNowComponent;
  let fixture: ComponentFixture<DesignNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
