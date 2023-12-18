import { ComponentFixture, TestBed } from '@angular/core/testing';
import { caseFlagsRefData, initialState } from '../../../../hearing.test.data';
import { HearingRequirementsSectionComponent } from './hearing-requirements-section.component';

describe('HearingRequirementsSectionComponent', () => {
  let component: HearingRequirementsSectionComponent;
  let fixture: ComponentFixture<HearingRequirementsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        HearingRequirementsSectionComponent
      ],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(HearingRequirementsSectionComponent);
    component = fixture.componentInstance;
    component.caseFlagsRefData = caseFlagsRefData;
    component.hearingRequestMainModel = initialState.hearings.hearingRequest.hearingRequestMainModel;
    component.serviceHearingValuesModel = initialState.hearings.hearingValues.serviceHearingValuesModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('caseFlags');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'caseFlags', changeLink: '/hearings/request/hearing-requirements#linkAmendFlags'
    });
  });
});
