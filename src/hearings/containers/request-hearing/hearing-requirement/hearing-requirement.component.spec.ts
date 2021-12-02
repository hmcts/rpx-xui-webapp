import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingRequirementComponent } from './hearing-requirement.component';

describe('HearingRequirementComponent', () => {
  let component: HearingRequirementComponent;
  let fixture: ComponentFixture<HearingRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
