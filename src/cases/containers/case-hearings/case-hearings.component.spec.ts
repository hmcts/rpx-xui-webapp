import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
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
import { Actions, HearingListingStatusEnum, HearingsSectionStatusEnum } from '../../../hearings/models/hearings.enum';
import { CaseHearingsComponent } from './case-hearings.component';

describe('CaseHearingsComponent', () => {

  let component: CaseHearingsComponent;
  let fixture: ComponentFixture<CaseHearingsComponent>;
  let de: DebugElement;
  let mockStore: any;
  let mockRoleCategoryMappingService: RoleCategoryMappingService;
  const HEARING_DAY_SCHEDULE_1: HearingDayScheduleModel = {
    hearingStartDateTime: '2021-05-01T16:00:00.000+0000',
    hearingEndDateTime: '2021-05-04T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
    hearingVenueId: 'venue 1',
    hearingRoomId: 'room 1',
    hearingPanel: ['child'],
  };
  const CASE_HEARING_1: CaseHearingModel = {
    hearingID: 'h111111',
    hearingType: 'Case management hearing',
    hmcStatus: 'Upcoming',
    lastResponseReceivedDateTime: '',
    responseVersion: 'rv1',
    hearingListingStatus: HearingListingStatusEnum.LISTED,
    listAssistCaseStatus: '',
    hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
  };
  const HEARINGS_LIST: CaseHearingsMainModel = {
    hmctsServiceID: 'SSCS',
    caseRef: '1568642646198441',
    caseHearings: [CASE_HEARING_1],
  };
  const initialState = {
    hearings: {
      hearingsList: HEARINGS_LIST,
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
    de = fixture.debugElement;
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
    expect(component.hearingsActions.includes(Actions.Create)).toBeTruthy();
    expect(component.hasRequestAction).toBeTruthy();
  });

  it('should getHearsListByStatus', () => {
    mockStore.pipe.and.returnValue(of(HEARINGS_LIST));
    const hearingList = component.getHearsListByStatus(HearingsSectionStatusEnum.UPCOMING);
    fixture.detectChanges();
    hearingList.subscribe(hearing => expect(hearing).toBeTruthy());
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
    TestBed.resetTestingModule();
  });
});
