import { ComponentFixture, TestBed } from '@angular/core/testing';
import { caseFlagsRefData, initialState } from '../../../../hearing.test.data';
import { HearingsService } from '../../../../services/hearings.service';
import { HearingRequirementsSectionComponent } from './hearing-requirements-section.component';

describe('HearingRequirementsSectionComponent', () => {
  let component: HearingRequirementsSectionComponent;
  let fixture: ComponentFixture<HearingRequirementsSectionComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
  const hearingsService = new HearingsService(mockedHttpClient);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        HearingRequirementsSectionComponent
      ],
      providers: [
        { provide: HearingsService, useValue: hearingsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingRequirementsSectionComponent);
    component = fixture.componentInstance;
    component.caseFlagsRefData = caseFlagsRefData;
    component.hearingRequestMainModel = initialState.hearings.hearingRequest.hearingRequestMainModel;
    component.hearingRequestToCompareMainModel = initialState.hearings.hearingRequestToCompare.hearingRequestMainModel;
    component.serviceHearingValuesModel = initialState.hearings.hearingValues.serviceHearingValuesModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the HMC parties', () => {
    component.ngOnInit();
    expect(component.partyIdsInHMC).toEqual(['P1', 'P2', 'P3']);
    expect(component.partyNamesInHMC).toEqual(['Jane and Smith', 'DWP', 'DWP']);
  });

  it('should display label', () => {
    hearingsService.propertiesUpdatedOnPageVisit = {
      caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
      parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
      hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
      afterPageVisit: {
        reasonableAdjustmentChangesRequired: true,
        partyDetailsChangesRequired: true,
        hearingWindowFirstDateMustBeChangesRequired: true
      }
    };
    component.ngOnInit();
    expect(component.reasonableAdjustmentChangesRequired).toEqual(true);
  });

  it('should not display label', () => {
    hearingsService.propertiesUpdatedOnPageVisit = {
      caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
      parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
      hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
      afterPageVisit: {
        reasonableAdjustmentChangesRequired: false,
        partyDetailsChangesRequired: true,
        hearingWindowFirstDateMustBeChangesRequired: true
      }
    };
    component.ngOnInit();
    expect(component.reasonableAdjustmentChangesRequired).toEqual(false);
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('caseFlags');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'caseFlags', changeLink: '/hearings/request/hearing-requirements#linkAmendFlags'
    });
  });
});
