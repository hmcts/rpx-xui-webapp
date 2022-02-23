import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingChangeReasonComponent } from './hearing-change-reason.component';

describe('HearingChangeReasonComponent', () => {
  let component: HearingChangeReasonComponent;
  let fixture: ComponentFixture<HearingChangeReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingChangeReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingChangeReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
