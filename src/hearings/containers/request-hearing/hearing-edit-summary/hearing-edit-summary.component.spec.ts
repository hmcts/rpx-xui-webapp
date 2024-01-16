import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { PartyFlagsModel } from '../../../../hearings/models/partyFlags.model';
import { caseFlagsRefData, initialState } from '../../../hearing.test.data';
import { EditHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';
import { HearingConditions } from '../../../models/hearingConditions';
import { CategoryType, Mode, PartyType, UnavailabilityType } from '../../../models/hearings.enum';
import { PropertiesUpdatedOnPageVisit } from '../../../models/hearingsUpdateMode.enum';
import { LocationByEPIMMSModel } from '../../../models/location.model';
import { HearingsService } from '../../../services/hearings.service';
import { LocationsDataService } from '../../../services/locations-data.service';
import * as fromHearingStore from '../../../store';
import { HearingEditSummaryComponent } from './hearing-edit-summary.component';

describe('HearingEditSummaryComponent', () => {
  let component: HearingEditSummaryComponent;
  let fixture: ComponentFixture<HearingEditSummaryComponent>;
  let store: any;

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

  const caseFlags: PartyFlagsModel[] = [
    {
      partyId: 'P1',
      partyName: 'Jane Smith',
      flagParentId: 'RA0008',
      flagId: 'RA0013',
      flagDescription: 'Sign language interpreter required',
      flagStatus: 'ACTIVE'
    },
    {
      partyId: 'P2',
      partyName: 'Jane Smith vs DWP',
      flagParentId: 'CF0001',
      flagId: 'RA0016',
      flagDescription: 'Potential fraud',
      flagStatus: 'ACTIVE'
    },
    {
      partyId: 'P3',
      partyName: 'Jane Smith vs DWP',
      flagParentId: 'CF0001',
      flagId: 'RA0042',
      flagDescription: 'Urgent flag',
      flagStatus: 'ACTIVE'
    },
    {
      partyId: 'P4',
      partyName: 'Jane Smith vs DWP',
      flagParentId: 'CF0001',
      flagId: 'RA0042',
      flagDescription: 'Urgent flag',
      flagStatus: 'ACTIVE'
    },
    {
      partyId: 'P5',
      partyName: 'Jane Smith vs DWP',
      flagParentId: 'CF0001',
      flagId: 'RA0053',
      flagDescription: 'Urgent flag',
      flagStatus: 'ACTIVE'
    }
  ];

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        HearingEditSummaryComponent
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
      mode: Mode.VIEW_EDIT,
      isHearingAmendmentsEnabled: true
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
    const expectedResult: PropertiesUpdatedOnPageVisit = {
      caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
      parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
      hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
      afterPageVisit: {
        reasonableAdjustmentChangesRequired: true,
        nonReasonableAdjustmentChangesRequired: true,
        partyDetailsChangesRequired: true,
        hearingWindowFirstDateMustBeChangesRequired: true
      }
    };
    expect(hearingsService.propertiesUpdatedOnPageVisit).toEqual(expectedResult);
  });

  it('should update the case details properties automatically setPropertiesUpdatedAutomatically', () => {
    component.serviceHearingValuesModel.hmctsInternalCaseName = 'New hmcts case name from service hearings';
    component.serviceHearingValuesModel.publicCaseName = 'New public case name from service hearings';
    component.serviceHearingValuesModel.caseManagementLocationCode = 'New location code';
    component.serviceHearingValuesModel.caserestrictedFlag = true;
    component.serviceHearingValuesModel.caseCategories = categories;
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
    storeDispatchSpy.calls.reset();
  });

  it('should update the hearing details properties automatically setPropertiesUpdatedAutomatically', () => {
    component.serviceHearingValuesModel.privateHearingRequiredFlag = true;
    component.serviceHearingValuesModel.hearingInWelshFlag = true;
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    const expectedResult = { ...component.hearingRequestMainModel.hearingDetails };
    expectedResult.privateHearingRequiredFlag = true;
    expectedResult.hearingInWelshFlag = true;
    expect(component.hearingRequestMainModel.hearingDetails).toEqual(expectedResult);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.UpdateHearingRequest(component.hearingRequestMainModel, component.hearingCondition));
    storeDispatchSpy.calls.reset();
  });

  it('should update the party details properties automatically setPropertiesUpdatedAutomatically', () => {
    component.serviceHearingValuesModel.parties = [
      {
        partyID: 'P1',
        partyName: 'Jane Smith',
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
    component.serviceHearingValuesModel.hearingInWelshFlag = true;
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
    storeDispatchSpy.calls.reset();
  });

  it('should set auto updated properties withing page to true', () => {
    component.serviceHearingValuesModel.hmctsInternalCaseName = 'New hmcts case name from service hearings';
    component.serviceHearingValuesModel.publicCaseName = 'New public case name from service hearings';
    component.serviceHearingValuesModel.privateHearingRequiredFlag = true;
    component.serviceHearingValuesModel.caserestrictedFlag = true;
    component.serviceHearingValuesModel.parties[0].unavailabilityRanges = [
      {
        unavailableFromDate: '2022-12-10T09:00:00.000Z',
        unavailableToDate: '2021-12-31T09:00:00.000Z',
        unavailabilityType: UnavailabilityType.ALL_DAY
      }
    ];

    component.ngOnInit();
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.hmctsInternalCaseName).toEqual(true);
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.publicCaseName).toEqual(true);
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.privateHearingRequiredFlag).toEqual(true);
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.caserestrictedFlag).toEqual(true);
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.parties).toEqual(true);
  });

  it('should set auto updated pageless properties to true', () => {
    component.serviceHearingValuesModel.caseManagementLocationCode = 'New case management code';
    component.serviceHearingValuesModel.parties[0].partyRole = 'New party role';
    component.serviceHearingValuesModel.parties[0].individualDetails.relatedParties = [];
    component.ngOnInit();
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.pageless.caseManagementLocationCode).toEqual(true);
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.pageless.parties).toEqual(true);
  });

  it('should set auto updated case type id in array, if new case type is added', () => {
    component.serviceHearingValuesModel.caseCategories = categories;
    component.ngOnInit();
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.caseCategories).toEqual(['BBA3-003', 'BBA3-002']);
  });

  it('should set auto updated case type id in array, if existing case type is changed', () => {
    categories[0].categoryValue = 'BBA3-002';
    component.serviceHearingValuesModel.caseCategories = categories;
    component.ngOnInit();
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.caseCategories).toEqual(['BBA3-002']);
  });

  describe('Display of warning and error message', () => {
    it('should display banner message', () => {
      component.serviceHearingValuesModel.caseManagementLocationCode = 'New Management location code';
      component.serviceHearingValuesModel.privateHearingRequiredFlag = true;
      component.serviceHearingValuesModel.hearingInWelshFlag = true;
      component.ngOnInit();
      expect(component.isPagelessAttributeChanged).toEqual(true);
      expect(component.isWithinPageAttributeChanged).toEqual(true);
    });

    it('should display banner message', () => {
      component.serviceHearingValuesModel.caseFlags = { flags: [], flagAmendURL: '/' };
      component.serviceHearingValuesModel.parties = [];
      component.hearingRequestMainModel.partyDetails = [];
      component.hearingRequestMainModel.hearingDetails.hearingWindow = {};
      component.serviceHearingValuesModel.hearingWindow = {};
      component.serviceHearingValuesModel.privateHearingRequiredFlag = true;
      component.serviceHearingValuesModel.hearingInWelshFlag = true;
      const storeDispatchSpy = spyOn(store, 'dispatch');
      component.ngOnInit();
      expect(component.isPagelessAttributeChanged).toEqual(true);
      expect(component.isWithinPageAttributeChanged).toEqual(true);
      storeDispatchSpy.calls.reset();
    });
  });

  it('should set auto updated properties withing page to true', () => {
    component.serviceHearingValuesModel.hmctsInternalCaseName = 'New hmcts case name from service hearings';
    component.serviceHearingValuesModel.publicCaseName = 'New public case name from service hearings';
    component.serviceHearingValuesModel.privateHearingRequiredFlag = true;
    component.serviceHearingValuesModel.caserestrictedFlag = true;
    component.serviceHearingValuesModel.parties[0].unavailabilityRanges = [
      {
        unavailableFromDate: '2022-12-10T09:00:00.000Z',
        unavailableToDate: '2021-12-31T09:00:00.000Z',
        unavailabilityType: UnavailabilityType.ALL_DAY
      }
    ];

    component.ngOnInit();
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.hmctsInternalCaseName).toEqual(true);
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.publicCaseName).toEqual(true);
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.privateHearingRequiredFlag).toEqual(true);
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.caserestrictedFlag).toEqual(true);
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.withinPage.parties).toEqual(true);
  });

  it('should set auto updated pageless properties to true', () => {
    component.serviceHearingValuesModel.caseManagementLocationCode = 'New case management code';
    component.serviceHearingValuesModel.parties[0].partyRole = 'New party role';
    component.serviceHearingValuesModel.parties[0].individualDetails.relatedParties = [];
    component.ngOnInit();
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.pageless.caseManagementLocationCode).toEqual(true);
    // @ts-ignore
    expect(component.hearingsService.propertiesUpdatedAutomatically.pageless.parties).toEqual(true);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
