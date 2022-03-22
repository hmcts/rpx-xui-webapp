import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {ErrorMessage} from '@hmcts/ccd-case-ui-toolkit/dist/shared/domain';
import {provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {initialState, serviceHearingValuesModel} from '../../../hearing.test.data';
import {HearingConditions} from '../../../models/hearingConditions';
import {HearingRequestMainModel} from '../../../models/hearingRequestMain.model';
import {ACTION} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {HearingRequirementsComponent} from './hearing-requirements.component';

@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

describe('HearingRequirementsComponent', () => {
  let component: HearingRequirementsComponent;
  let fixture: ComponentFixture<HearingRequirementsComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingRequirementsComponent, MockHearingPartiesComponent],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                caseFlags: null,
              },
            },
            fragment: of('point-to-me'),
          },
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HearingRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should window onFocus', () => {
    const storeDispatchSpy = spyOn(component.hearingStore, 'dispatch');
    component.lostFocus = true;
    component.onFocus();
    expect(component.lostFocus).toBeFalsy();
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.LoadHearingValues(component.referenceId));
  });

  it('should window onblur', () => {
    component.onBlur();
    expect(component.lostFocus).toBeTruthy();
  });

  it('should set option collection', () => {
    expect(component).toBeDefined();
    expect(component.serviceHearingValuesModel).toEqual(serviceHearingValuesModel);
  });

  it('should call unsubscribe', () => {
    spyOn(component.hearingStateSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.hearingStateSub.unsubscribe).toHaveBeenCalled();
  });

  it('should initialize hearing request from hearing values', () => {
    const expectedHearingRequestMainModel: HearingRequestMainModel = {
      requestDetails: {
        requestTimeStamp: null
      },
      hearingDetails: {
        duration: 45,
        hearingType: 'Final',
        hearingLocations: [
          {
            locationId: '196538',
            locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
            locationType: 'hearing',
            region: 'North West',
          },
          {
            locationId: '219164',
            locationName: 'ABERDEEN TRIBUNAL HEARING CENTRE',
            locationType: 'hearing',
            region: 'Scotland',
          }
        ],
        hearingIsLinkedFlag: false,
        hearingWindow: {
          hearingWindowDateRange: {
            hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
            hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000'
          },
          hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000'
        },
        privateHearingRequiredFlag: false,
        panelRequirements: undefined,
        autolistFlag: false,
        hearingPriorityType: 'standard',
        numberOfPhysicalAttendees: 2,
        hearingInWelshFlag: false,
        facilitiesRequired: [],
        listingComments: '',
        hearingRequester: '',
        leadJudgeContractType: '',
      },
      caseDetails: {
        hmctsServiceCode: 'BBA3',
        caseRef: '1111222233334444',
        requestTimeStamp: null,
        hearingID: null,
        caseDeepLink: null,
        hmctsInternalCaseName: 'Jane vs DWP',
        publicCaseName: 'Jane vs DWP',
        caseAdditionalSecurityFlag: false,
        caseCategories: [],
        caseManagementLocationCode: null,
        caserestrictedFlag: null,
        caseSLAStartDate: null
      },
      partyDetails: []
    };
    const storeDispatchSpy = spyOn(component.hearingStore, 'dispatch');
    component.initializeHearingRequestFromHearingValues();
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.InitializeHearingRequest(expectedHearingRequestMainModel));
  });

  it('should initialize hearing condition', () => {
    const hearingCondition: HearingConditions = {
      isInit: false,
      region: 'North West,Scotland'
    };
    const storeDispatchSpy = spyOn(component.hearingStore, 'dispatch');
    component.initializeHearingCondition();
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.SaveHearingConditions(hearingCondition));
  });

  afterEach(() => {
    fixture.destroy();
  });
});
