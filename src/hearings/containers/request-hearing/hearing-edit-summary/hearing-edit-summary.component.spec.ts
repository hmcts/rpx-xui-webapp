import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { MockRpxTranslatePipe } from '../../../../app/shared/test/mock-rpx-translate.pipe';
import { caseFlagsRefData, initialState } from '../../../hearing.test.data';
import { EditHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';
import { HearingConditions } from '../../../models/hearingConditions';
import { CategoryType, Mode, PartyType, UnavailabilityType } from '../../../models/hearings.enum';
import { LocationByEPIMMSModel } from '../../../models/location.model';
import { HearingsService } from '../../../services/hearings.service';
import { LocationsDataService } from '../../../services/locations-data.service';
import * as fromHearingStore from '../../../store';
import { HearingEditSummaryComponent } from './hearing-edit-summary.component';

describe('HearingEditSummaryComponent', () => {
  let component: HearingEditSummaryComponent;
  let fixture: ComponentFixture<HearingEditSummaryComponent>;
  let store: any;
  let hearingValues: any;
  const routeMock = {
    snapshot: {
      data: {
        caseFlags: caseFlagsRefData
      }
    },
    fragment: of('point-to-me')
  };
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl'
  ]);
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const locationsDataService = new LocationsDataService(mockedHttpClient);
  const hearingsService = new HearingsService(mockedHttpClient);
  const mockFeatureToggleService = jasmine.createSpyObj('FeatureToggleService', ['isEnabled']);

  const locations: LocationByEPIMMSModel[] = [{
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        HearingEditSummaryComponent,
        MockRpxTranslatePipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({ initialState }),
        LoadingService,
        {
          provide: HearingsService,
          useValue: hearingsService
        },
        {
          provide: LocationsDataService,
          useValue: locationsDataService
        },
        {
          provide: FeatureToggleService,
          useValue: mockFeatureToggleService
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: ActivatedRoute,
          useValue: routeMock
        }
      ]
    })
      .compileComponents();

    store = TestBed.inject(Store);
    mockFeatureToggleService.isEnabled.and.returnValue(of(true));
    spyOn(locationsDataService, 'getLocationById').and.returnValue(of(locations));
    hearingValues = _.cloneDeep(initialState.hearings.hearingValues);
    fixture = TestBed.createComponent(HearingEditSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe', () => {
    component.hearingStateSub = of().subscribe();
    spyOn(component.hearingStateSub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.hearingStateSub.unsubscribe).toHaveBeenCalled();
  });

  it('should focus on the element', () => {
    spyOn(component, 'fragmentFocus');
    component.ngAfterViewInit();
    expect(component.fragmentFocus).toHaveBeenCalled();
  });

  it('should save hearing condition and navigate to change link', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    const hearingCondition: HearingConditions = {
      fragmentId: 'point-to-me',
      mode: Mode.VIEW_EDIT
    };
    const editHearingChangeConfig: EditHearingChangeConfig = {
      fragmentId: 'point-to-me',
      changeLink: 'hearing/request/venue'
    };
    component.onChange(editHearingChangeConfig);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.SaveHearingConditions(hearingCondition));
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('hearing/request/venue');
  });

  it('should set propertiesUpdatedOnPageVisit', () => {
    spyOn(store, 'select').and.returnValue(of(initialState.hearings.hearingValues));
    component.serviceHearingValuesModel = initialState.hearings.hearingValues.serviceHearingValuesModel;
    component.ngOnInit();
    const expectedResult = {
      caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
      parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties
    };
    expect(hearingsService.propertiesUpdatedOnPageVisit).toEqual(expectedResult);
  });

  it('should update the case details properties automatically setPropertiesUpdatedAutomatically', () => {
    hearingValues.serviceHearingValuesModel.hmctsInternalCaseName = 'New hmcts case name from service hearings';
    hearingValues.serviceHearingValuesModel.publicCaseName = 'New public case name from service hearings';
    hearingValues.serviceHearingValuesModel.caseManagementLocationCode = 'New location code';
    hearingValues.serviceHearingValuesModel.caserestrictedFlag = true;
    const categories = [
      {
        categoryType: CategoryType.CaseType,
        categoryValue: 'BBA3-003'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002CC',
        categoryParent: 'BBA3-003'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002GC',
        categoryParent: 'BBA3-003'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002RC',
        categoryParent: 'BBA3-003'
      }];
    hearingValues.serviceHearingValuesModel.caseCategories = [...categories];
    const selectSpy = spyOn(store, 'select').and.returnValue(of(hearingValues));
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    const expectedResult = { ...component.hearingRequestMainModel.caseDetails };
    expectedResult.hmctsInternalCaseName = 'New hmcts case name from service hearings';
    expectedResult.publicCaseName = 'New public case name from service hearings';
    expectedResult.caseManagementLocationCode = 'New location code';
    expectedResult.caserestrictedFlag = true;
    expectedResult.caseCategories = [...categories];
    expect(component.hearingRequestMainModel.caseDetails).toEqual(expectedResult);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.UpdateHearingRequest(component.hearingRequestMainModel, component.hearingCondition));

    selectSpy.calls.reset();
    storeDispatchSpy.calls.reset();
  });

  it('should update the hearing details properties automatically setPropertiesUpdatedAutomatically', () => {
    hearingValues.serviceHearingValuesModel.privateHearingRequiredFlag = true;
    hearingValues.serviceHearingValuesModel.hearingInWelshFlag = true;
    const selectSpy = spyOn(store, 'select').and.returnValue(of(hearingValues));
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    const expectedResult = { ...component.hearingRequestMainModel.hearingDetails };
    expectedResult.privateHearingRequiredFlag = true;
    expectedResult.hearingInWelshFlag = true;
    expect(component.hearingRequestMainModel.hearingDetails).toEqual(expectedResult);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.UpdateHearingRequest(component.hearingRequestMainModel, component.hearingCondition));

    selectSpy.calls.reset();
    storeDispatchSpy.calls.reset();
  });

  it('should update the party details properties automatically setPropertiesUpdatedAutomatically', () => {
    hearingValues.serviceHearingValuesModel.parties = [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyRole: 'New appellant',
        individualDetails: {
          title: 'Miss',
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042',
            'RA0009'
          ],
          interpreterLanguage: 'PF0015',
          preferredHearingChannel: 'byVideo',
          relatedParties: [{
            relatedPartyID: 'New party Id',
            relationshipType: 'new releationship type'
          }],
          custodyStatus: 'New custody status',
          vulnerableFlag: true,
          vulnerabilityDetails: 'New vulnerability details',
          hearingChannelEmail: ['New email'],
          hearingChannelPhone: ['New Phone']
        },
        organisationDetails: {
          name: 'New organisation name',
          organisationType: 'New organisation type',
          cftOrganisationID: 'New organisation Id'
        },
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-10T09:00:00.000Z',
            unavailableToDate: '2021-12-31T09:00:00.000Z',
            unavailabilityType: UnavailabilityType.ALL_DAY
          }
        ]
      }
    ];
    hearingValues.serviceHearingValuesModel.hearingInWelshFlag = true;
    const selectSpy = spyOn(store, 'select').and.returnValue(of(hearingValues));
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    const expectedResult = [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyRole: 'New appellant',
        individualDetails: {
          title: 'Miss',
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042'
          ],
          interpreterLanguage: 'PF0015',
          preferredHearingChannel: 'inPerson',
          relatedParties: [{
            relatedPartyID: 'New party Id',
            relationshipType: 'new releationship type'
          }],
          custodyStatus: 'New custody status',
          vulnerableFlag: true,
          vulnerabilityDetails: 'New vulnerability details',
          hearingChannelEmail: ['New email'],
          hearingChannelPhone: ['New Phone']
        },
        organisationDetails: {
          name: 'New organisation name',
          organisationType: 'New organisation type',
          cftOrganisationID: 'New organisation Id'
        },
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-10T09:00:00.000Z',
            unavailableToDate: '2021-12-31T09:00:00.000Z',
            unavailabilityType: UnavailabilityType.ALL_DAY
          }
        ]
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyRole: 'claimant',
        individualDetails: {
          preferredHearingChannel: 'byVideo',
          reasonableAdjustments: [
            'RA0005'
          ],
          interpreterLanguage: null,
          relatedParties: undefined,
          custodyStatus: undefined,
          vulnerableFlag: undefined,
          vulnerabilityDetails: undefined,
          hearingChannelEmail: undefined,
          hearingChannelPhone: undefined
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000'
        },
        unavailabilityDOW: undefined,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-20T09:00:00.000Z',
            unavailableToDate: '2021-12-31T09:00:00.000Z',
            unavailabilityType: UnavailabilityType.ALL_DAY
          }
        ]
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyRole: 'claimant',
        individualDetails: {
          preferredHearingChannel: 'byVideo',
          reasonableAdjustments: [
            'RA0005'
          ],
          interpreterLanguage: null,
          relatedParties: undefined,
          custodyStatus: undefined,
          vulnerableFlag: undefined,
          vulnerabilityDetails: undefined,
          hearingChannelEmail: undefined,
          hearingChannelPhone: undefined
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000'
        },
        unavailabilityDOW: undefined,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-20T09:00:00.000Z',
            unavailableToDate: '2021-12-31T09:00:00.000Z',
            unavailabilityType: UnavailabilityType.ALL_DAY
          }
        ]
      }
    ];
    expect(component.hearingRequestMainModel.partyDetails).toEqual(expectedResult);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.UpdateHearingRequest(component.hearingRequestMainModel, component.hearingCondition));

    selectSpy.calls.reset();
    storeDispatchSpy.calls.reset();
  });

  fit('should display banner message', () => {
    console.log('HEARING VALUES PRIVATE HEARING REQUIRED FLAG BEFORE', hearingValues.serviceHearingValuesModel.privateHearingRequiredFlag);
    console.log('HEARING IN WELSH FLAG BEFORE', hearingValues.serviceHearingValuesModel.hearingInWelshFlag);

    hearingValues.serviceHearingValuesModel.privateHearingRequiredFlag = true;
    hearingValues.serviceHearingValuesModel.hearingInWelshFlag = true;
    const selectSpy = spyOn(store, 'select').and.returnValue(of(hearingValues));
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();

    console.log('HEARING VALUES PRIVATE HEARING REQUIRED FLAG AFTER', hearingValues.serviceHearingValuesModel.privateHearingRequiredFlag);
    console.log('HEARING IN WELSH FLAG AFTER', hearingValues.serviceHearingValuesModel.hearingInWelshFlag);

    console.log('IS PAGELESS ATTRIBUTE CHANGED', component.isPagelessAttributeChanged);

    console.log('DISPLAY BANNNER', component.displayBanner);

    selectSpy.calls.reset();
    storeDispatchSpy.calls.reset();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
