import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessage } from '@hmcts/ccd-case-ui-toolkit/dist/shared/domain';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { caseFlagsRefData, initialState, serviceHearingValuesModel } from '../../../hearing.test.data';
import { HearingRequestMainModel } from '../../../models/hearingRequestMain.model';
import { ACTION, CaseFlagType, PartyType } from '../../../models/hearings.enum';
import { LocationByEPIMMSModel } from '../../../models/location.model';
import { HearingsService } from '../../../services/hearings.service';
import { LocationsDataService } from '../../../services/locations-data.service';
import * as fromHearingStore from '../../../store';
import { HearingRequirementsComponent } from './hearing-requirements.component';

@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

describe('HearingRequirementsComponent', () => {
  const FOUND_LOCATIONS: LocationByEPIMMSModel[] = [{
    epimms_id: '196538',
    site_name: 'Liverpool Social Security and Child Support Tribunal',
    court_name: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
    open_for_public: 'YES',
    region_id: '5',
    region: 'North West',
    cluster_id: '3',
    cluster_name: 'Cheshire and Merseyside',
    court_status: 'Open',
    court_open_date: null,
    closed_date: null,
    postcode: 'L2 5UZ',
    court_address: 'PRUDENTIAL BUILDING, 36 DALE STREET, LIVERPOOL',
    phone_number: '',
    court_location_code: '',
    dx_address: '',
    welsh_site_name: '',
    welsh_court_address: '',
    venue_name: 'Liverpool',
    is_case_management_location: 'Y',
    is_hearing_location: 'Y'
  }];
  let component: HearingRequirementsComponent;
  let fixture: ComponentFixture<HearingRequirementsComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  const locationsDataService = new LocationsDataService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingRequirementsComponent, MockHearingPartiesComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        { provide: LocationsDataService, useValue: locationsDataService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                caseFlags: caseFlagsRefData,
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
    component.caseFlagType = CaseFlagType.REASONABLE_ADJUSTMENT;
    spyOn(locationsDataService, 'getLocationById').and.returnValue(of(FOUND_LOCATIONS));
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
            locationType: 'hearing',
          },
          {
            locationId: '234850',
            locationType: 'hearing',
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
        panelRequirements: {
          roleType: [
            'tribunalJudge',
            'deputyTribunalJudge',
            'regionalTribunalJudge',
          ],
          panelPreferences: [],
          panelSpecialisms: [
            'DisabilityQualifiedPanelMember',
            'EyeSurgeon',
            'GeneralPractitioner',
            'FinanciallyQualifiedPanelMember',
            'RegionalMedicalMember',
          ],
        },
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
      partyDetails: [{
        partyID: 'P1',
        partyType: PartyType.IND,
        partyRole: 'appellant',
        partyName: 'Jane Smith',
        unavailabilityRanges: [{
          unavailableFromDate: '2021-12-10T09:00:00.000+0000',
          unavailableToDate: '2021-12-31T09:00:00.000+0000'
        }],
        individualDetails: {
          title: 'Mrs',
          firstName: 'Jane',
          lastName: 'Smith',
          preferredHearingChannel: 'inPerson',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042'],
          interpreterLanguage: 'PF0015'
        },
        organisationDetails: {}
      }, {
        partyID: 'P2',
        partyType: PartyType.ORG,
        partyRole: 'claimant',
        partyName: 'DWP',
        unavailabilityRanges: [{
          unavailableFromDate: '2021-12-20T09:00:00.000+0000',
          unavailableToDate: '2021-12-31T09:00:00.000+0000'
        }],
        individualDetails: {
          title: null,
          firstName: 'DWP',
          lastName: null,
          preferredHearingChannel: 'inPerson',
          reasonableAdjustments: ['RA0005'],
          interpreterLanguage: null
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000'
        },
      }]
    };
    const storeDispatchSpy = spyOn(component.hearingStore, 'dispatch');
    component.initializeHearingRequestFromHearingValues();
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.InitializeHearingRequest(expectedHearingRequestMainModel));
  });

  afterEach(() => {
    fixture.destroy();
  });
});
