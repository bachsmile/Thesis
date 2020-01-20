import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatityPlaceAdminComponent } from './chatity-place-admin.component';

describe('ChatityPlaceAdminComponent', () => {
  let component: ChatityPlaceAdminComponent;
  let fixture: ComponentFixture<ChatityPlaceAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatityPlaceAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatityPlaceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
