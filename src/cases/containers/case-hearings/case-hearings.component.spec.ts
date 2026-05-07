import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseNotifier, CasesService, CaseView, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import moment from 'moment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { SessionStorageService } from '../../../app/services';
import { MockRpxTranslatePipe } from '../../../app/shared/test/mock-rpx-translate.pipe';
import { HearingConditions } from '../../../hearings/models/hearingConditions';
import { HearingDayScheduleModel } from '../../../hearings/models/hearingDaySchedule.model';
import { HearingListModel } from '../../../hearings/models/hearingList.model';
import { HearingListMainModel } from '../../../hearings/models/hearingListMain.model';
import { HearingListViewModel } from '../../../hearings/models/hearingListView.model';
import {
  Actions,
  EXUIDisplayStatusEnum,
  EXUISectionStatusEnum,
  HMCStatus,
  HearingListingStatusEnum,
  HearingSummaryEnum,
} from '../../../hearings/models/hearings.enum';
import { LovRefDataModel } from '../../../hearings/models/lovRefData.model';
import { LovRefDataService } from '../../../hearings/services/lov-ref-data.service';
import * as fromHearingStore from '../../../hearings/store';
import { CaseHearingsComponent } from './case-hearings.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CaseHearingsComponent', () => {
  let component: CaseHearingsComponent;
  let fixture: ComponentFixture<CaseHearingsComponent>;
  let mockStore: Store<fromHearingStore.State>;
  let spyStore: any;
  let mockLovRefDataService: any;
  let mockSessionStore: jasmine.SpyObj<SessionStorageService>;
  let loadingService: LoadingService;
  let mockCaseNotifier: CaseNotifier;

  const HEARING_DAY_SCHEDULE_1: HearingDayScheduleModel = {
    hearingStartDateTime: '',
    hearingEndDateTime: '2021-05-04T16:00:00.000Z',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
    hearingVenueId: 'venue 1',
    hearingRoomId: 'room 1',
    hearingJudgeId: 'hearingJudgeId1',
    panelMemberIds: ['hearingJudgeId1'],
    attendees: [],
  };

  const HEARING_DAY_SCHEDULE_2: HearingDayScheduleModel = {
    hearingStartDateTime: '',
    hearingEndDateTime: '2021-06-04T16:00:00.000Z',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba4',
    hearingVenueId: 'venue 2',
    hearingRoomId: 'room 2',
    hearingJudgeId: 'hearingJudgeId1',
    panelMemberIds: ['hearingJudgeId1'],
    attendees: [],
  };

  const HEARING_DAY_SCHEDULE_3: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-03-12T16:00:00.000Z',
    hearingEndDateTime: '2021-06-12T16:00:00.000Z',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc4',
    hearingVenueId: 'venue 3',
    hearingRoomId: 'room 3',
    hearingJudgeId: 'hearingJudgeId1',
    panelMemberIds: ['hearingJudgeId1'],
    attendees: [],
  };

  const HEARING_DAY_SCHEDULE_4: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-10-12T16:00:00.000Z',
    hearingEndDateTime: '2021-11-12T16:00:00.000Z',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc5',
    hearingVenueId: 'venue 4',
    hearingRoomId: 'room 4',
    hearingJudgeId: 'hearingJudgeId2',
    panelMemberIds: ['hearingJudgeId2'],
    attendees: [],
  };

  const HEARING_DAY_SCHEDULE_5: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-04-12T16:00:00.000Z',
    hearingEndDateTime: '2021-05-12T16:00:00.000Z',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
    hearingVenueId: 'venue 5',
    hearingRoomId: 'room 5',
    hearingJudgeId: 'hearingJudgeId3',
    panelMemberIds: ['hearingJudgeId3'],
    attendees: [],
  };

  const HEARING_DAY_SCHEDULE_6: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-05-02T16:00:00.000Z',
    hearingEndDateTime: '2021-05-20T16:00:00.000Z',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b55',
    hearingVenueId: 'venue 1',
    hearingRoomId: 'room 1',
    hearingJudgeId: 'hearingJudgeId1',
    panelMemberIds: ['hearingJudgeId1'],
    attendees: [],
  };

  const HEARING_DAY_SCHEDULE_7: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-06-12T16:00:00.000Z',
    hearingEndDateTime: '2021-07-12T16:00:00.000Z',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b44',
    hearingVenueId: 'venue 2',
    hearingRoomId: 'room 2',
    hearingJudgeId: 'hearingJudgeId1',
    panelMemberIds: ['hearingJudgeId1'],
    attendees: [],
  };

  const HEARING_DAY_SCHEDULE_8: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-02-13T16:00:00.000Z',
    hearingEndDateTime: '2021-03-13T16:00:00.000Z',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b34',
    hearingVenueId: 'venue 3',
    hearingRoomId: 'room 3',
    hearingJudgeId: 'hearingJudgeId1',
    panelMemberIds: ['hearingJudgeId1'],
    attendees: [],
  };

  const HEARING_DAY_SCHEDULE_9: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-03-12T16:00:00.000Z',
    hearingEndDateTime: '2021-04-12T16:00:00.000Z',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
    hearingVenueId: 'venue 4',
    hearingRoomId: 'room 4',
    hearingJudgeId: 'hearingJudgeId1',
    panelMemberIds: ['hearingJudgeId1'],
    attendees: [],
  };

  const HEARING_DAY_SCHEDULE_10: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-04-12T16:00:00.000Z',
    hearingEndDateTime: '2021-05-12T16:00:00.000Z',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b66',
    hearingVenueId: 'venue 5',
    hearingRoomId: 'room 5',
    hearingJudgeId: 'hearingJudgeId1',
    panelMemberIds: ['hearingJudgeId1'],
    attendees: [],
  };

  const HEARING_DAY_SCHEDULE_11: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-09-01T16:00:00.000Z',
    hearingEndDateTime: '2021-09-04T16:00:00.000Z',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b33',
    hearingVenueId: 'venue 11',
    hearingRoomId: 'room 11',
    hearingJudgeId: 'child',
    panelMemberIds: ['child'],
    attendees: [],
  };

  const CASE_HEARING_1: HearingListModel = {
    hearingID: 'h100001',
    hearingType: 'Case management hearing',
    hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
    lastResponseReceivedDateTime: '',
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_LISTING,
    hmcStatus: HMCStatus.HEARING_REQUESTED,
    responseVersion: 'rv1',
    hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
    listAssistCaseStatus: '',
    hearingIsLinkedFlag: true,
    hearingGroupRequestId: null,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
  };

  const CASE_HEARING_2: HearingListModel = {
    hearingID: 'h100002',
    hearingType: 'Final hearing',
    lastResponseReceivedDateTime: '',
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
    exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_LISTING,
    hmcStatus: HMCStatus.AWAITING_LISTING,
    responseVersion: 'rv2',
    hearingListingStatus: HearingListingStatusEnum.AWAITING_LISTING,
    listAssistCaseStatus: '',
    hearingIsLinkedFlag: false,
    hearingGroupRequestId: null,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_2],
  };

  const CASE_HEARING_3: HearingListModel = {
    hearingID: 'h100003',
    hearingType: 'Initial hearing',
    lastResponseReceivedDateTime: '',
    hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
    hmcStatus: HMCStatus.LISTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.LISTED,
    responseVersion: 'rv3',
    hearingListingStatus: HearingListingStatusEnum.LISTED,
    listAssistCaseStatus: '',
    hearingIsLinkedFlag: false,
    hearingGroupRequestId: null,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_3],
  };

  const CASE_HEARING_4: HearingListModel = {
    hearingID: 'h100004',
    hearingType: 'Case management hearing',
    lastResponseReceivedDateTime: '',
    hearingRequestDateTime: '2021-10-01T16:00:00.000Z',
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.UPDATE_REQUESTED,
    hmcStatus: HMCStatus.UPDATE_REQUESTED,
    responseVersion: 'rv4',
    hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
    listAssistCaseStatus: '',
    hearingIsLinkedFlag: false,
    hearingGroupRequestId: null,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_4],
  };

  const CASE_HEARING_5: HearingListModel = {
    hearingID: 'h100005',
    hearingType: 'Case management preliminary hearing - open',
    lastResponseReceivedDateTime: '',
    hearingRequestDateTime: '2021-10-01T16:00:00.000Z',
    hmcStatus: HMCStatus.UPDATE_SUBMITTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.UPDATE_REQUESTED,
    responseVersion: 'rv5',
    hearingListingStatus: HearingListingStatusEnum.UPDATE_SUBMITTED,
    listAssistCaseStatus: '',
    hearingIsLinkedFlag: false,
    hearingGroupRequestId: null,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
  };

  const CASE_HEARING_6: HearingListModel = {
    hearingID: 'h100006',
    hearingType: 'Directions hearing',
    lastResponseReceivedDateTime: '',
    hearingRequestDateTime: '2021-09-01T14:00:00.000Z',
    hmcStatus: HMCStatus.EXCEPTION,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.UPDATE_REQUESTED,
    responseVersion: 'rv6',
    hearingListingStatus: HearingListingStatusEnum.EXCEPTION,
    listAssistCaseStatus: '',
    hearingIsLinkedFlag: false,
    hearingGroupRequestId: null,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_6],
  };

  const CASE_HEARING_7: HearingListModel = {
    hearingID: 'h100007',
    hearingType: 'Full hearing',
    lastResponseReceivedDateTime: '',
    hearingRequestDateTime: '2021-09-01T14:00:00.000Z',
    hmcStatus: HMCStatus.CANCELLATION_REQUESTED,
    exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLATION_REQUESTED,
    responseVersion: 'rv7',
    hearingListingStatus: HearingListingStatusEnum.CANCELLATION_REQUESTED,
    listAssistCaseStatus: '',
    hearingIsLinkedFlag: false,
    hearingGroupRequestId: null,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_7],
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
  };

  const CASE_HEARING_8: HearingListModel = {
    hearingID: 'h100008',
    hearingType: 'Directions hearing',
    lastResponseReceivedDateTime: '',
    hmcStatus: HMCStatus.VACATED,
    exuiDisplayStatus: EXUIDisplayStatusEnum.VACATED,
    hearingRequestDateTime: '2021-09-14T16:00:00.000Z',
    responseVersion: 'rv8',
    hearingListingStatus: HearingListingStatusEnum.VACATED,
    listAssistCaseStatus: '',
    hearingIsLinkedFlag: false,
    hearingGroupRequestId: null,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_8],
    exuiSectionStatus: EXUISectionStatusEnum.PAST_OR_CANCELLED,
  };

  const CASE_HEARING_9: HearingListModel = {
    hearingID: 'h100009',
    hearingType: 'Pre-hearing review',
    lastResponseReceivedDateTime: '',
    hearingRequestDateTime: '2021-09-01T14:00:00.000Z',
    hmcStatus: HMCStatus.AWAITING_ACTUALS,
    responseVersion: 'rv9',
    hearingListingStatus: HearingListingStatusEnum.AWAITING_ACTUALS,
    listAssistCaseStatus: '',
    hearingIsLinkedFlag: false,
    hearingGroupRequestId: null,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_9],
    exuiSectionStatus: EXUISectionStatusEnum.PAST_OR_CANCELLED,
    exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_ACTUALS,
  };

  const CASE_HEARING_10: HearingListModel = {
    hearingID: 'h100010',
    hearingType: 'Case management preliminary hearing - open',
    lastResponseReceivedDateTime: '',
    hmcStatus: HMCStatus.COMPLETED,
    hearingRequestDateTime: '2021-09-01T14:00:00.000Z',
    responseVersion: 'rv10',
    hearingListingStatus: HearingListingStatusEnum.COMPLETED,
    listAssistCaseStatus: '',
    hearingIsLinkedFlag: false,
    hearingGroupRequestId: null,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_10],
    exuiSectionStatus: EXUISectionStatusEnum.PAST_OR_CANCELLED,
    exuiDisplayStatus: EXUIDisplayStatusEnum.COMPLETED,
  };

  const CASE_HEARING_11: HearingListModel = {
    hearingID: 'h100011',
    hearingType: 'Remedy hearing',
    hearingRequestDateTime: '2021-09-14T16:00:00.000Z',
    lastResponseReceivedDateTime: '',
    hmcStatus: HMCStatus.COMPLETED,
    responseVersion: 'rv11',
    hearingListingStatus: HearingListingStatusEnum.ADJOURNED,
    listAssistCaseStatus: '',
    hearingIsLinkedFlag: false,
    hearingGroupRequestId: null,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_11],
    exuiDisplayStatus: EXUIDisplayStatusEnum.COMPLETED,
    exuiSectionStatus: EXUISectionStatusEnum.PAST_OR_CANCELLED,
  };

  const HEARINGS_LIST: HearingListMainModel = {
    hmctsServiceID: 'BBA3',
    caseRef: '1620409659381330',
    caseHearings: [
      CASE_HEARING_1,
      CASE_HEARING_2,
      CASE_HEARING_3,
      CASE_HEARING_4,
      CASE_HEARING_5,
      CASE_HEARING_6,
      CASE_HEARING_7,
      CASE_HEARING_8,
      CASE_HEARING_9,
      CASE_HEARING_10,
      CASE_HEARING_11,
    ],
  };

  const initialState = {
    hearings: {
      hearingList: {
        hearingListMainModel: HEARINGS_LIST,
      },
      hearingValues: {
        serviceHearingValuesModel: {
          hmctsServiceID: 'BBA3',
        },
        lastError: null,
      },
    },
  };

  const HEARING_TYPES_REF_DATA: LovRefDataModel[] = [
    {
      active_flag: 'Y',
      category_key: 'HearingType',
      child_nodes: null,
      hint_text_cy: '',
      hint_text_en: '',
      key: 'BBA3-CHA',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      value_cy: '',
      value_en: 'Chambers Outcome',
    },
    {
      active_flag: 'Y',
      category_key: 'HearingType',
      child_nodes: null,
      hint_text_cy: '',
      hint_text_en: '',
      key: 'BBA3-CHA',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      value_cy: '',
      value_en: 'Substantive',
    },
    {
      active_flag: 'Y',
      category_key: 'HearingType',
      child_nodes: null,
      hint_text_cy: '',
      hint_text_en: '',
      key: 'BBA3-CHA',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      value_cy: '',
      value_en: 'Direction Hearings',
    },
  ];

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigated: true,
    events: of(),
    routerState: {
      snapshot: {
        root: {
          paramMap: convertToParamMap({ cid: '1620409659381330' }),
          children: [],
        },
      },
    },
  };

  const cv = {
    case_id: '1620409659381330',
    case_type: {
      id: 'CIVIL',
      name: '',
      jurisdiction: {
        id: 'CIVIL',
        name: '',
        description: '',
      },
    },
  } as CaseView;
  const DEFAULT_CASE_INFO = { caseId: '1620409659381330', jurisdiction: 'CIVIL', caseType: 'CIVIL' };

  beforeEach(() => {
    mockLovRefDataService = jasmine.createSpyObj('LovRefDataService', ['getListOfValues']);
    mockLovRefDataService.getListOfValues.and.returnValue(of(HEARING_TYPES_REF_DATA));

    mockSessionStore = jasmine.createSpyObj<SessionStorageService>('sessionStorageService', ['getItem']);
    mockSessionStore.getItem.and.callFake((key: string) => {
      if (key === 'caseInfo') {
        return JSON.stringify(DEFAULT_CASE_INFO);
      }
      return null;
    });
    const mockCasesService = jasmine.createSpyObj<CasesService>('mockCasesService', ['getCaseView']);
    mockCaseNotifier = new CaseNotifier(mockCasesService);
    mockCaseNotifier.caseView = new BehaviorSubject(cv).asObservable();
    TestBed.configureTestingModule({
      declarations: [CaseHearingsComponent, MockRpxTranslatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [
        LoadingService,
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: LovRefDataService,
          useValue: mockLovRefDataService,
        },
        {
          provide: SessionStorageService,
          useValue: mockSessionStore,
        },
        {
          provide: CaseNotifier,
          useValue: mockCaseNotifier,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CaseHearingsComponent);
    mockStore = TestBed.inject(Store);
    loadingService = TestBed.inject(LoadingService);
    component = fixture.componentInstance;
    spyStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
  });

  it('should create hearing component', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    spyStore.pipe.and.returnValue(of(initialState.hearings.hearingValues.serviceHearingValuesModel));
    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(component.hearingValuesSubscription).toBeDefined();
    expect(component.refDataSubscription).toBeDefined();
    expect(dispatchSpy).toHaveBeenCalledWith(
      new fromHearingStore.LoadHearingValues({ jurisdictionId: 'CIVIL', caseReference: '1620409659381330', caseType: 'CIVIL' })
    );
  });

  describe('ngOnInit route case id handling', () => {
    it('should start hearing setup immediately when a case id is available from the route', () => {
      const loadingToken = 'loading-token';
      spyOn(loadingService, 'register').and.returnValue(loadingToken);
      const unregisterSpy = spyOn(loadingService, 'unregister');
      const startSetupSpy = spyOn<any>(component, 'startHearingSetupForCase').and.stub();
      spyOn<any>(component, 'getCaseIdFromRouterState').and.returnValue(DEFAULT_CASE_INFO.caseId);

      component.ngOnInit();

      expect(component.caseId).toBe(DEFAULT_CASE_INFO.caseId);
      expect(startSetupSpy).toHaveBeenCalledOnceWith(loadingToken);
      expect(unregisterSpy).not.toHaveBeenCalledWith(loadingToken);
    });

    it('should unregister loading and not start setup when navigation has finished without a case id', () => {
      const loadingToken = 'loading-token';
      spyOn(loadingService, 'register').and.returnValue(loadingToken);
      const unregisterSpy = spyOn(loadingService, 'unregister');
      const startSetupSpy = spyOn<any>(component, 'startHearingSetupForCase').and.stub();
      spyOn<any>(component, 'getCaseIdFromRouterState').and.returnValue('');

      component.hearingListLastErrorState$ = new Subject<any>().asObservable();
      component.hearingValuesLastErrorState$ = new Subject<any>().asObservable();
      (mockRouter as any).navigated = true;

      component.ngOnInit();

      expect(startSetupSpy).not.toHaveBeenCalled();
      expect(component.serverError).toEqual({
        id: 'backendError',
        message: 'There was a system error and your request could not be processed. Please try again.',
      });
      expect(unregisterSpy).toHaveBeenCalledWith(loadingToken);
    });

    it('should wait for NavigationEnd before starting setup when the case id is not initially available', () => {
      const loadingToken = 'loading-token';
      const routerEvents$ = new Subject<NavigationEnd>();
      spyOn(loadingService, 'register').and.returnValue(loadingToken);
      const startSetupSpy = spyOn<any>(component, 'startHearingSetupForCase').and.stub();
      spyOn<any>(component, 'getCaseIdFromRouterState').and.returnValues('', DEFAULT_CASE_INFO.caseId);

      (mockRouter as any).navigated = false;
      (mockRouter as any).events = routerEvents$.asObservable();

      component.ngOnInit();

      expect(startSetupSpy).not.toHaveBeenCalled();

      routerEvents$.next(new NavigationEnd(1, '/cases/case-details', '/cases/case-details'));

      expect(component.caseId).toBe(DEFAULT_CASE_INFO.caseId);
      expect(startSetupSpy).toHaveBeenCalledOnceWith(loadingToken);

      routerEvents$.next(new NavigationEnd(2, '/again', '/again'));

      expect(startSetupSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('startHearingSetupForCase', () => {
    it('should set server error, unregister loading, and stop setup when route case id does not match case notifier case id', () => {
      const loadingToken = 'loading-token';
      const dispatchSpy = spyOn(mockStore, 'dispatch');
      const unregisterSpy = spyOn(loadingService, 'unregister');

      component.caseId = DEFAULT_CASE_INFO.caseId;

      mockCaseNotifier.caseView = of({
        ...cv,
        case_id: 'different-case-id',
      } as CaseView);

      (component as any).startHearingSetupForCase(loadingToken);

      expect(component.serverError).toEqual({
        id: 'backendError',
        message: HearingSummaryEnum.BackendError,
      });
      expect(unregisterSpy).toHaveBeenCalledWith(loadingToken);
      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should continue setup when route case id matches case notifier case id', () => {
      const loadingToken = 'loading-token';
      const dispatchSpy = spyOn(mockStore, 'dispatch');
      const unregisterSpy = spyOn(loadingService, 'unregister');

      component.caseId = DEFAULT_CASE_INFO.caseId;

      mockCaseNotifier.caseView = of(cv as CaseView);

      (component as any).startHearingSetupForCase(loadingToken);

      expect(component.serverError).toBeNull();
      expect(component.caseType).toBe('CIVIL');
      expect(component.jurisdiction).toBe('CIVIL');
      expect(dispatchSpy).toHaveBeenCalledWith(new fromHearingStore.ResetHearingList());
      expect(dispatchSpy).toHaveBeenCalledWith(new fromHearingStore.LoadAllHearings(DEFAULT_CASE_INFO.caseId));
      expect(unregisterSpy).not.toHaveBeenCalledWith(loadingToken);
    });
  });

  describe('findRouteParameter', () => {
    const routeSnapshot = (params = {}, children = []): any => ({
      paramMap: convertToParamMap(params),
      children,
    });

    it('should return the route parameter when it exists on the current route', () => {
      const route = routeSnapshot({ cid: DEFAULT_CASE_INFO.caseId });

      const result = (component as any).findRouteParameter(route, 'cid');

      expect(result).toBe(DEFAULT_CASE_INFO.caseId);
    });

    it('should return the route parameter when it exists on a child route', () => {
      const childRoute = routeSnapshot({ cid: DEFAULT_CASE_INFO.caseId });
      const rootRoute = routeSnapshot({}, [childRoute]);

      const result = (component as any).findRouteParameter(rootRoute, 'cid');

      expect(result).toBe(DEFAULT_CASE_INFO.caseId);
    });

    it('should return the route parameter when it exists on a nested child route', () => {
      const nestedRoute = routeSnapshot({ cid: DEFAULT_CASE_INFO.caseId });
      const childRoute = routeSnapshot({}, [nestedRoute]);
      const rootRoute = routeSnapshot({}, [childRoute]);

      const result = (component as any).findRouteParameter(rootRoute, 'cid');

      expect(result).toBe(DEFAULT_CASE_INFO.caseId);
    });

    it('should return null when the route parameter does not exist', () => {
      const rootRoute = routeSnapshot({}, [
        routeSnapshot({ otherParam: 'not-the-case-id' }),
      ]);

      const result = (component as any).findRouteParameter(rootRoute, 'cid');

      expect(result).toBeNull();
    });

    it('should return null when the route node is null', () => {
      const result = (component as any).findRouteParameter(null, 'cid');

      expect(result).toBeNull();
    });
  });



  it('should reset hearing list before loading hearings for the current case', () => {
    component.caseId = '1620409659381330';
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    component.reloadHearings();

    expect(dispatchSpy.calls.argsFor(0)[0]).toEqual(new fromHearingStore.ResetHearingList());
    expect(dispatchSpy.calls.argsFor(1)[0]).toEqual(new fromHearingStore.LoadAllHearings('1620409659381330'));
  });

  it('should unsubscribe', () => {
    component.lastErrorSubscription = new Observable().subscribe();
    component.hearingValuesSubscription = new Observable().subscribe();
    component.refDataSubscription = new Observable().subscribe();
    spyOn(component.lastErrorSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.hearingValuesSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.refDataSubscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.lastErrorSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.hearingValuesSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.refDataSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('should set hearings manager actions', () => {
    const USER_DETAILS = {
      sessionTimeout: {
        idleModalDisplayTime: 12,
        totalIdleTime: 10,
      },
      canShareCases: true,
      userInfo: {
        id: '123',
        forename: 'test',
        surname: 'test',
        email: 'test@test.com',
        active: 'true',
        roles: ['hearing-manager'],
      },
    };
    mockSessionStore.getItem.and.returnValue(JSON.stringify(USER_DETAILS.userInfo));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hearingsActions.length).toBe(4);
    expect(component.hearingsActions.includes(Actions.CREATE)).toBeTruthy();
    expect(component.hasRequestAction).toBeTruthy();
  });

  it('should provide read-only access to hearings-viewer users', () => {
    const USER_DETAILS = {
      sessionTimeout: {
        idleModalDisplayTime: 12,
        totalIdleTime: 10,
      },
      canShareCases: true,
      userInfo: {
        id: '123',
        forename: 'test',
        surname: 'test',
        email: 'test@test.com',
        active: 'true',
        roles: ['hearing-viewer'],
      },
    };
    mockSessionStore.getItem.and.returnValue(JSON.stringify(USER_DETAILS.userInfo));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hearingsActions.length).toBe(1);
    expect(component.hearingsActions.includes(Actions.READ)).toBeTruthy();
    expect(component.hasRequestAction).toBeFalsy();
  });

  it('should set hearings actions on OGD/DWP user', () => {
    const USER_DETAILS = {
      sessionTimeout: {
        idleModalDisplayTime: 12,
        totalIdleTime: 10,
      },
      canShareCases: true,
      userInfo: {
        id: '123',
        forename: 'test',
        surname: 'test',
        email: 'test@test.com',
        active: 'true',
        roles: ['listed-hearing-viewer'],
      },
    };
    mockSessionStore.getItem.and.returnValue(JSON.stringify(USER_DETAILS.userInfo));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hearingsActions.length).toBe(1);
    expect(component.hearingsActions.includes(Actions.READ)).toBeTruthy();
    expect(component.hasRequestAction).toBeFalsy();
    expect(component.isOgdRole).toBeTruthy();
  });

  it('should handle all hearings permissions', () => {
    const USER_DETAILS = {
      sessionTimeout: {
        idleModalDisplayTime: 12,
        totalIdleTime: 10,
      },
      canShareCases: true,
      userInfo: {
        id: '123',
        forename: 'test',
        surname: 'test',
        email: 'test@test.com',
        active: 'true',
        roles: ['listed-hearing-viewer', 'hearing-manager', 'hearing-viewer'],
      },
    };
    mockSessionStore.getItem.and.returnValue(JSON.stringify(USER_DETAILS.userInfo));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hearingsActions.length).toBe(4);
    expect(component.hearingsActions.includes(Actions.CREATE)).toBeTruthy();
    expect(component.hasRequestAction).toBeTruthy();
  });

  it('should getHearingsList by EXUISectionStatus', (done) => {
    component.caseId = DEFAULT_CASE_INFO.caseId;
    const hearingList = component.getHearingListByStatus(EXUISectionStatusEnum.UPCOMING);
    hearingList.subscribe((hearing) => {
      expect(hearing.length).toBe(7);
      done();
    });
  });

  it('should getHearingsList by EXUIDisplayStatus', (done) => {
    component.caseId = DEFAULT_CASE_INFO.caseId;
    const hearingList = component.getHearingListByStatus(EXUIDisplayStatusEnum.LISTED);
    hearingList.subscribe((hearing) => {
      expect(hearing.length).toBe(1);
      done();
    });
  });

  it('should have first Update section status hearing with hearing status as Waiting', (done) => {
    component.ngOnInit();
    component.upcomingHearings$.subscribe((hearing) => {
      expect(hearing[0].exuiDisplayStatus).toEqual(EXUIDisplayStatusEnum.AWAITING_LISTING);
      done();
    });
  });

  it('should provide a date', () => {
    const testVM: HearingListViewModel = {
      hearingID: 'h111111',
      hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
      hearingType: 'Case management hearing 2',
      lastResponseReceivedDateTime: '',
      hmcStatus: HMCStatus.AWAITING_ACTUALS,
      earliestHearingStartDateTime: '',
      responseVersion: 'rv1',
      hearingListingStatus: HearingListingStatusEnum.LISTED,
      exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
      listAssistCaseStatus: '',
      hearingIsLinkedFlag: false,
      hearingGroupRequestId: null,
      hearingDaySchedule: [HEARING_DAY_SCHEDULE_2],
    };

    const testVM2: HearingListViewModel = {
      hearingID: 'h111111',
      hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
      hearingType: 'Case management hearing 2',
      lastResponseReceivedDateTime: '',
      hmcStatus: HMCStatus.AWAITING_ACTUALS,
      earliestHearingStartDateTime: '',
      responseVersion: 'rv1',
      hearingListingStatus: HearingListingStatusEnum.LISTED,
      exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
      listAssistCaseStatus: '',
      hearingIsLinkedFlag: false,
      hearingGroupRequestId: null,
      hearingDaySchedule: [HEARING_DAY_SCHEDULE_10],
    };

    const arrangeData = [testVM, testVM2];
    const result = arrangeData[0].hearingDaySchedule.map((schedule) => schedule.hearingStartDateTime);
    expect(result).toBeDefined();
  });

  it('should have the Update section status hearings with out status as Waiting to be listed in hearing date order', (done) => {
    component.ngOnInit();
    component.upcomingHearings$.subscribe((hearing) => {
      expect(moment(hearing[3].hearingRequestDateTime).isAfter(moment(hearing[2].hearingRequestDateTime))).toBeFalsy();
      done();
    });
  });

  it('should have the cancel and passed section status hearings with Cancel listing state and no hearing date assigned in creation date order', (done) => {
    component.ngOnInit();
    component.pastAndCancelledHearings$.subscribe((hearings) => {
      expect(hearings[0].exuiDisplayStatus).toEqual(EXUIDisplayStatusEnum.COMPLETED);
      expect(hearings[1].exuiDisplayStatus).toEqual(EXUIDisplayStatusEnum.COMPLETED);
      done();
    });
  });

  it('should create hearing request', () => {
    component.caseId = DEFAULT_CASE_INFO.caseId;
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    spyOn(mockStore, 'select').and.returnValue(of(null));
    const hearingCondition: HearingConditions = {
      mode: 'create',
      isInit: true,
      caseId: '1620409659381330',
    };
    component.createHearingRequest();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'request']);
    expect(dispatchSpy).toHaveBeenCalledWith(
      jasmine.objectContaining(new fromHearingStore.SaveHearingConditions(hearingCondition))
    );
  });

  it('should call the reloadhearings when reload clicked', () => {
    spyOn(component, 'reloadHearings');
    fixture.detectChanges();
    component.serverError = { id: '', message: 'server error' };
    fixture.detectChanges();
    const cancelledReasonElement: HTMLSelectElement = fixture.nativeElement.querySelector('#reload-hearing-tab');
    cancelledReasonElement.click();
    expect(component.reloadHearings).toHaveBeenCalled();
  });

  it('should dispatch events to load all hearings and hearing values', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.reloadHearings();
    expect(dispatchSpy).toHaveBeenCalledTimes(3);
  });

  it('should not return hearings for a different case', (done) => {
    spyOn(mockStore, 'pipe').and.returnValue(
      of({
        hearingListMainModel: {
          ...HEARINGS_LIST,
          caseRef: 'another-case',
        },
      })
    );

    component.getHearingListByStatus(EXUISectionStatusEnum.UPCOMING).subscribe((hearing) => {
      expect(hearing).toEqual([]);
      done();
    });
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });
});
