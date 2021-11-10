import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UserRole } from '../../../app/models/user-details.model';
import { RoleCategoryMappingService } from '../../../app/services/role-category-mapping/role-category-mapping.service';
import { CaseHearingModel } from '../../../hearings/models/caseHearing.model';
import { CaseHearingsMainModel } from '../../../hearings/models/caseHearingsMain.model';
import { HearingDayScheduleModel } from '../../../hearings/models/hearingDaySchedule.model';
import { CaseHearingViewModel } from '../../../models/case-hearing-view.model';
import { Actions, EXUISectionStatusEnum, HearingListingStatusEnum, HMCStatus } from '../../../hearings/models/hearings.enum';
import { CaseHearingsComponent } from './case-hearings.component';
import * as moment from 'moment';

describe('CaseHearingsComponent', () => {
  let component: CaseHearingsComponent;
  let fixture: ComponentFixture<CaseHearingsComponent>;
  let mockStore: any;
  let mockRoleCategoryMappingService: RoleCategoryMappingService;

  const HEARING_DAY_SCHEDULE_1: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-01-12T16:00:00.000+0000',
    hearingEndDateTime: '2021-02-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
    hearingVenueId: 'venue 1',
    hearingRoomId: 'room 1',
    hearingPanel: ['child'],
  };

  const HEARING_DAY_SCHEDULE_2: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-02-12T16:00:00.000+0000',
    hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba4',
    hearingVenueId: 'venue 2',
    hearingRoomId: 'room 2',
    hearingPanel: ['child'],
  };

  const HEARING_DAY_SCHEDULE_3: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-03-12T16:00:00.000+0000',
    hearingEndDateTime: '2021-04-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc4',
    hearingVenueId: 'venue 3',
    hearingRoomId: 'room 3',
    hearingPanel: ['child'],
  };

  const HEARING_DAY_SCHEDULE_4: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-10-12T16:00:00.000+0000',
    hearingEndDateTime: '2021-11-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc5',
    hearingVenueId: 'venue 4',
    hearingRoomId: 'room 4',
    hearingPanel: ['child'],
  };

  const HEARING_DAY_SCHEDULE_5: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-04-12T16:00:00.000+0000',
    hearingEndDateTime: '2021-05-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
    hearingVenueId: 'venue 5',
    hearingRoomId: 'room 5',
    hearingPanel: ['child'],
  };

  const HEARING_DAY_SCHEDULE_6: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-052T16:00:00.000+0000',
    hearingEndDateTime: '2021-062T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
    hearingVenueId: 'venue 5',
    hearingRoomId: 'room 5',
    hearingPanel: ['child'],
  };

  const HEARING_DAY_SCHEDULE_7: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-06-12T16:00:00.000+0000',
    hearingEndDateTime: '2021-07-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
    hearingVenueId: 'venue 5',
    hearingRoomId: 'room 5',
    hearingPanel: ['child'],
  };

  const HEARING_DAY_SCHEDULE_8: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-02-13T16:00:00.000+0000',
    hearingEndDateTime: '2021-03-13T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
    hearingVenueId: 'venue 5',
    hearingRoomId: 'room 5',
    hearingPanel: ['child'],
  };

  const HEARING_DAY_SCHEDULE_9: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-03-12T16:00:00.000+0000',
    hearingEndDateTime: '2021-04-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
    hearingVenueId: 'venue 5',
    hearingRoomId: 'room 5',
    hearingPanel: ['child'],
  };

  const HEARING_DAY_SCHEDULE_10: HearingDayScheduleModel = {
    hearingStartDateTime: '234324322021-04-13T16:00:00.000+0000',
    hearingEndDateTime: '2021-05-13T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
    hearingVenueId: 'venue 5',
    hearingRoomId: 'room 5',
    hearingPanel: ['child'],
  };

  const CASE_HEARING_1: CaseHearingModel = {
    hearingID: 'h111111',
    hearingType: 'Case management hearing',
    hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
    lastResponseReceivedDateTime: '',
    hmcStatus: HMCStatus.AWAITING_ACTUALS,
    responseVersion: 'rv1',
    hearingListingStatus: HearingListingStatusEnum.AWAITING_LISTING,
    listAssistCaseStatus: '',
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
  };

  const CASE_HEARING_2: CaseHearingModel = {
    hearingID: 'h222222',
    hearingType: 'Final hearing',
    hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
    lastResponseReceivedDateTime: '',
    hmcStatus: HMCStatus.AWAITING_ACTUALS,
    responseVersion: 'rv2',
    hearingListingStatus: HearingListingStatusEnum.LISTED,
    listAssistCaseStatus: '',
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_2],
  };

  const CASE_HEARING_3: CaseHearingModel = {
    hearingID: 'h333333',
    hearingType: 'Initial hearing',
    hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
    lastResponseReceivedDateTime: '',
    hmcStatus:  HMCStatus.AWAITING_ACTUALS,
    responseVersion: 'rv3',
    hearingListingStatus: HearingListingStatusEnum.COMPLETED,
    listAssistCaseStatus: '',
    exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_3],
  };

  const CASE_HEARING_4: CaseHearingModel = {
    hearingID: 'h444444',
    hearingType: 'Case management hearing',
    hearingRequestDateTime: '2021-10-22T16:00:00.000+0000',
    lastResponseReceivedDateTime: '',
    hmcStatus:  HMCStatus.AWAITING_ACTUALS,
    responseVersion: 'rv4',
    hearingListingStatus: HearingListingStatusEnum.CANCELLED,
    listAssistCaseStatus: '',
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_4],
  };

  const CASE_HEARING_5: CaseHearingModel = {
    hearingID: 'h555555',
    hearingType: 'Directions hearing',
    hmcStatus: HMCStatus.AWAITING_ACTUALS,
    lastResponseReceivedDateTime: '',
    hearingRequestDateTime: '2021-09-14T16:00:00.000+0000',
    responseVersion: 'rv5',
    hearingListingStatus: HearingListingStatusEnum.CANCELLED,
    listAssistCaseStatus: '',
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
  };

  const CASE_HEARING_6: CaseHearingModel = {
    hearingID: 'h222222',
    hearingType: 'Next hearing',
    hmcStatus:  HMCStatus.AWAITING_ACTUALS,
    lastResponseReceivedDateTime: '',
    responseVersion: 'rv2',
    hearingRequestDateTime: '2021-11-12T16:00:00.000+0000',
    hearingListingStatus: HearingListingStatusEnum.LISTED,
    listAssistCaseStatus: '',
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_6],
  };

  const CASE_HEARING_7: CaseHearingModel = {
    hearingID: 'h222222',
    hearingType: 'Next hearing',
    hmcStatus: HMCStatus.AWAITING_ACTUALS,
    hearingRequestDateTime: '2021-03-12T16:00:00.000+0000',
    lastResponseReceivedDateTime: '',
    responseVersion: 'rv2',
    hearingListingStatus: HearingListingStatusEnum.LISTED,
    listAssistCaseStatus: '',
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_7],
  };

  const CASE_HEARING_8: CaseHearingModel = {
    hearingID: 'h111111',
    hearingType: 'Case management hearing 2',
    hmcStatus:  HMCStatus.AWAITING_ACTUALS,
    lastResponseReceivedDateTime: '',
    hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
    responseVersion: 'rv1',
    hearingListingStatus: HearingListingStatusEnum.LISTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    listAssistCaseStatus: '',
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_8],
  };

  const CASE_HEARING_9: CaseHearingModel = {
    hearingID: 'h555555',
    hearingType: 'Directions hearing',
    hmcStatus:  HMCStatus.AWAITING_ACTUALS,
    lastResponseReceivedDateTime: '',
    hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
    responseVersion: 'rv5',
    hearingListingStatus:  HearingListingStatusEnum.CANCELLED,
    listAssistCaseStatus: '',
    exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_9],
  };

  const CASE_HEARING_10: CaseHearingModel = {
    hearingID: 'h555555',
    hearingType: 'Directions hearing',
    hmcStatus:  HMCStatus.AWAITING_ACTUALS,
    lastResponseReceivedDateTime: '',
    hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
    responseVersion: 'rv5',
    hearingListingStatus:  HearingListingStatusEnum.CANCELLED,
    listAssistCaseStatus: '',
    exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_10],
  };

  const HEARINGS_LIST: CaseHearingsMainModel = {
    hmctsServiceID: 'SSCS',
    caseRef: '1568642646198441',
    caseHearings: [CASE_HEARING_1, CASE_HEARING_2, CASE_HEARING_3, CASE_HEARING_4, CASE_HEARING_5, CASE_HEARING_6, CASE_HEARING_7, CASE_HEARING_8, CASE_HEARING_9, CASE_HEARING_10],
  };
  const initialState = {
    hearings: {
      hearingsList: {
        caseHearingsMainModel: HEARINGS_LIST
      },
    }
  };

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
    mockRoleCategoryMappingService = jasmine.createSpyObj('RoleCategoryMappingService', ['isJudicialOrLegalOpsCategory']);
    TestBed.configureTestingModule({
      declarations: [CaseHearingsComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({initialState}),
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
          provide: RoleCategoryMappingService,
          useValue: mockRoleCategoryMappingService,
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CaseHearingsComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    mockRoleCategoryMappingService.isJudicialOrLegalOpsCategory.and.returnValue(of(UserRole.Judicial));
    fixture.detectChanges();
  });

  it('should create hearing component', () => {
    expect(component).toBeTruthy();
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
    mockStore.pipe.and.returnValue(of(USER_DETAILS));
    // @ts-ignore
    mockRoleCategoryMappingService.isJudicialOrLegalOpsCategory.and.returnValue(of(UserRole.LegalOps));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hearingsActions.length).toBe(4);
    expect(component.hearingsActions.includes(Actions.CREATE)).toBeTruthy();
    expect(component.hasRequestAction).toBeTruthy();
  });

  it('should getHearsListByStatus', (done) => {
    const hearingList = component.getHearsListByStatus(EXUISectionStatusEnum.UPCOMING);
    hearingList.subscribe(hearing => {
      expect(hearing.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should have first Update section status hearing with hearing status as Waiting', (done) => {
    component.upcomingHearings$.subscribe(hearing => {
      expect(hearing[0].hearingListingStatus).toEqual(HearingListingStatusEnum.AWAITING_LISTING);
      done();
    });
  });

  it('should provide a date', () => {
    const testVM: CaseHearingViewModel = {
      hearingID: 'h111111',
      hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
      hearingType: 'Case management hearing 2',
      lastResponseReceivedDateTime: '',
      hmcStatus:  HMCStatus.AWAITING_ACTUALS,
      mostRecentHearingStartDateTime: '',
      responseVersion: 'rv1',
      hearingListingStatus: HearingListingStatusEnum.LISTED,
      exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
      listAssistCaseStatus: '',
      hearingDaySchedule: [HEARING_DAY_SCHEDULE_2],
    };

    const testVM2: CaseHearingViewModel = {
      hearingID: 'h111111',
      hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
      hearingType: 'Case management hearing 2',
      lastResponseReceivedDateTime: '',
      hmcStatus:  HMCStatus.AWAITING_ACTUALS,
      mostRecentHearingStartDateTime: '',
      responseVersion: 'rv1',
      hearingListingStatus: HearingListingStatusEnum.LISTED,
      exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
      listAssistCaseStatus: '',
      hearingDaySchedule: [HEARING_DAY_SCHEDULE_10],
    };

    const arrangeData = [testVM, testVM2];
    const result = arrangeData[0].hearingDaySchedule.map(schedule => schedule.hearingStartDateTime);
    expect(result).toBeDefined();

  });

  it('should have the Update section status hearings with out status as Waiting to be listed in hearing date order', (done) => {
    component.upcomingHearings$.subscribe(hearing => {
      expect(hearing[2].hmcStatus).toEqual(HMCStatus.AWAITING_ACTUALS);
      expect(hearing[3].hmcStatus).toEqual(HMCStatus.AWAITING_ACTUALS);
      expect(hearing[2].hearingListingStatus).not.toEqual(HearingListingStatusEnum.AWAITING_LISTING);
      expect(hearing[3].hearingListingStatus).not.toEqual(HearingListingStatusEnum.CANCELLED);
      expect(moment(hearing[3].hearingRequestDateTime).isBefore(moment(hearing[2].hearingRequestDateTime))).toBeFalsy();
      done();
    });
  });

  it('should have the cancel and passed section status hearings with Cancel listing state and no hearing date assigned in creation date order', (done) => {
    component.pastAndCancelledHearings$.subscribe(hearing => {
      expect(hearing[0].hearingListingStatus).toEqual(HearingListingStatusEnum.CANCELLED);
      expect(hearing[1].hearingListingStatus).toEqual(HearingListingStatusEnum.CANCELLED);
      done();
    });
  });

  it('should getHearsListByStatus', () => {
    mockStore.pipe.and.returnValue(of(HEARINGS_LIST));
    const hearingList = component.getHearsListByStatus(EXUISectionStatusEnum.UPCOMING);
    fixture.detectChanges();
    hearingList.subscribe(hearing => expect(hearing).toBeTruthy());
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
    TestBed.resetTestingModule();
  });
});
