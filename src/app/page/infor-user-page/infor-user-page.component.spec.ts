import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InforUserPageComponent } from './infor-user-page.component';

describe('InforUserPageComponent', () => {
  let component: InforUserPageComponent;
  let fixture: ComponentFixture<InforUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InforUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InforUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
