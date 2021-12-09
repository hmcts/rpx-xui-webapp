import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingRequirementsComponent } from './hearing-requirements.component';

describe('HearingRequirementsComponent', () => {
  let component: HearingRequirementsComponent;
  let fixture: ComponentFixture<HearingRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
