import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { UserRole } from '../../../app/models';
import { RoleCategoryMappingService } from '../../../app/services/role-category-mapping/role-category-mapping.service';
import { HearingConditions } from '../../../hearings/models/hearingConditions';
import { HearingDayScheduleModel } from '../../../hearings/models/hearingDaySchedule.model';
import { HearingListModel } from '../../../hearings/models/hearingList.model';
import { HearingListMainModel } from '../../../hearings/models/hearingListMain.model';
import { HearingListViewModel } from '../../../hearings/models/hearingListView.model';
import {
  Actions,
  EXUIDisplayStatusEnum,
  EXUISectionStatusEnum,
  HearingListingStatusEnum,
  HMCStatus
} from '../../../hearings/models/hearings.enum';
import * as fromHearingStore from '../../../hearings/store';
import { CaseHearingsComponent } from './case-hearings.component';

describe('CaseHearingsComponent', () => {
  let component: CaseHearingsComponent;
  let fixture: ComponentFixture<CaseHearingsComponent>;
  let mockStore: Store<fromHearingStore.State>;
  let spyStore: any;
  let mockRoleCategoryMappingService: RoleCategoryMappingService;
  let mockRouter: any;

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
    exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
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
    exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
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
    exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
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
    exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
  };

  const HEARINGS_LIST: HearingListMainModel = {
    hmctsServiceID: 'BBA3',
    caseRef: '1568642646198441',
    caseHearings: [CASE_HEARING_1, CASE_HEARING_2, CASE_HEARING_3, CASE_HEARING_4, CASE_HEARING_5, CASE_HEARING_6, CASE_HEARING_7, CASE_HEARING_8, CASE_HEARING_9, CASE_HEARING_10, CASE_HEARING_11],
  };

  const initialState = {
    hearings: {
      hearingList: {
        hearingListMainModel: HEARINGS_LIST
      },
    }
  };

  mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    mockRoleCategoryMappingService = jasmine.createSpyObj('RoleCategoryMappingService', ['getUserRoleCategory']);
    TestBed.configureTestingModule({
      declarations: [CaseHearingsComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                cid: '1234'
              },
            }
          }
        },
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: RoleCategoryMappingService,
          useValue: mockRoleCategoryMappingService,
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CaseHearingsComponent);
    mockStore = TestBed.get(Store);
    component = fixture.componentInstance;
    // @ts-ignore
    mockRoleCategoryMappingService.getUserRoleCategory.and.returnValue(of(UserRole.Judicial));
    spyStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
    fixture.detectChanges();
  });

  it('should create hearing component', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe', () => {
    component.lastErrorSubscription = new Observable().subscribe();
    spyOn(component.lastErrorSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.lastErrorSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('should set hearings actions', () => {
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
        roles: ['caseworker-sscs'],
      }
    };

    spyStore.pipe.and.returnValue(of(USER_DETAILS));
    // @ts-ignore
    mockRoleCategoryMappingService.getUserRoleCategory.and.returnValue(of(UserRole.LegalOps));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hearingsActions.length).toBe(4);
    expect(component.hearingsActions.includes(Actions.CREATE)).toBeTruthy();
    expect(component.hasRequestAction).toBeTruthy();
  });

  it('should getHearsList by EXUISectionStatus', (done) => {
    const hearingList = component.getHearingListByStatus(EXUISectionStatusEnum.UPCOMING);
    hearingList.subscribe(hearing => {
      expect(hearing.length).toBe(7);
      done();
    });
  });

  it('should getHearsList by EXUIDisplayStatus', (done) => {
    const hearingList = component.getHearingListByStatus(EXUIDisplayStatusEnum.LISTED);
    hearingList.subscribe(hearing => {
      expect(hearing.length).toBe(1);
      done();
    });
  });

  it('should have first Update section status hearing with hearing status as Waiting', (done) => {
    component.upcomingHearings$.subscribe(hearing => {
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
    const result = arrangeData[0].hearingDaySchedule.map(schedule => schedule.hearingStartDateTime);
    expect(result).toBeDefined();
  });

  it('should have the Update section status hearings with out status as Waiting to be listed in hearing date order', (done) => {
    component.upcomingHearings$.subscribe(hearing => {
      expect(moment(hearing[3].hearingRequestDateTime).isAfter(moment(hearing[2].hearingRequestDateTime))).toBeFalsy();
      done();
    });
  });

  it('should have the cancel and passed section status hearings with Cancel listing state and no hearing date assigned in creation date order', (done) => {
    component.pastAndCancelledHearings$.subscribe(hearing => {
      expect(hearing[0].exuiDisplayStatus).toEqual(EXUIDisplayStatusEnum.COMPLETED);
      expect(hearing[1].exuiDisplayStatus).toEqual(EXUIDisplayStatusEnum.COMPLETED);
      done();
    });
  });

  it('should create hearing request', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    spyOn(mockStore, 'select').and.returnValue(of(null));
    const hearingCondition: HearingConditions = {
      mode: 'create',
      isInit: true,
      caseId: '1234'
    };
    component.createHearingRequest();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'request']);
    expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining(new fromHearingStore.SaveHearingConditions(hearingCondition)));
  });

  it('should call the reloadhearings when reload clicked', () => {
    spyOn(component, 'reloadHearings');
    component.serverError = {id: '', message: 'server error'};
    fixture.detectChanges();
    const cancelledReasonElement: HTMLSelectElement = fixture.nativeElement.querySelector('#reload-hearing-tab');
    cancelledReasonElement.click();
    expect(component.reloadHearings).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });
});
