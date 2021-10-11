import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingsRequestComponent } from './hearings-request.component';

describe('HearingsRequestComponent', () => {
  let component: HearingsRequestComponent;
  let fixture: ComponentFixture<HearingsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
