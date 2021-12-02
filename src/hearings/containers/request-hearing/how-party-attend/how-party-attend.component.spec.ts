import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowPartyAttendComponent } from './how-party-attend.component';

describe('HowPartyAttendComponent', () => {
  let component: HowPartyAttendComponent;
  let fixture: ComponentFixture<HowPartyAttendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowPartyAttendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowPartyAttendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
