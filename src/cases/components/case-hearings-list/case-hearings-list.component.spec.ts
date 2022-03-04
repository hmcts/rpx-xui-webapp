import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FeatureUser} from '@hmcts/rpx-xui-common-lib';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {RoleCategoryMappingService} from 'src/app/services/role-category-mapping/role-category-mapping.service';
import {HearingListViewModel} from '../../../hearings/models/hearingListView.model';
import {Actions, EXUIDisplayStatusEnum, EXUISectionStatusEnum,} from '../../../hearings/models/hearings.enum';
import {HearingsPipesModule} from '../../../hearings/pipes/hearings.pipes.module';
import * as fromHearingStore from '../../../hearings/store';
import {CaseHearingsListComponent} from './case-hearings-list.component';

class MockRoleCategoryMappingService {
  public initialize = (user: FeatureUser, clientId: string): void => {
  };
  public isEnabled = (feature: string): Observable<boolean> => of(true);
  public getValue = <R>(key: string, defaultValue: R): Observable<R> => of(defaultValue);
  public getValueOnce = <R>(key: string, defaultValue: R): Observable<R> => of(defaultValue);
}

const UPCOMING_HEARING_LIST: HearingListViewModel[] = [{
  hearingID: 'h100001',
  hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
  hearingType: 'Case management hearing',
  hmcStatus: 'Hearing requested',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv1',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'UPDATE REQUESTED',
  listAssistCaseStatus: '',
  hearingDaySchedule: null,
  exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
  exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_LISTING
}, {
  hearingID: 'h100002',
  hearingRequestDateTime: '2021-10-01T16:00:00.000+0000',
  hearingType: 'Final hearing',
  hmcStatus: 'Awaiting listing',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv2',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'AWAITING LISTING',
  listAssistCaseStatus: '',
  hearingDaySchedule: [],
  exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
  exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_LISTING
}, {
  hearingID: 'h100003',
  hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
  hearingType: 'Initial hearing',
  hmcStatus: 'Listed',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv3',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'LISTED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [{
    hearingStartDateTime: '2021-05-04T09:00:00.000+0000',
    hearingEndDateTime: '2021-05-04T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
    hearingVenueId: 'venue 1',
    hearingRoomId: 'room 1',
    hearingPanel: []
  }, {
    hearingStartDateTime: '2021-05-05T09:00:00.000+0000',
    hearingEndDateTime: '2021-05-05T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba4',
    hearingVenueId: 'venue 2',
    hearingRoomId: 'room 2',
    hearingPanel: []
  }],
  exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
  exuiDisplayStatus: EXUIDisplayStatusEnum.LISTED
}, {
  hearingID: 'h100004',
  hearingRequestDateTime: '2021-10-01T16:00:00.000+0000',
  hearingType: 'Case management hearing',
  hmcStatus: 'Update requested',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv4',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'UPDATE REQUESTED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [{
    hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
    hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc4',
    hearingVenueId: 'venue 3',
    hearingRoomId: 'room 3',
    hearingPanel: []
  }, {
    hearingStartDateTime: '2021-03-13T09:00:00.000+0000',
    hearingEndDateTime: '2021-03-13T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc5',
    hearingVenueId: 'venue 4',
    hearingRoomId: 'room 4',
    hearingPanel: []
  }],
  exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
  exuiDisplayStatus: EXUIDisplayStatusEnum.UPDATE_REQUESTED
}, {
  hearingID: 'h100005',
  hearingRequestDateTime: '2021-10-01T16:00:00.000+0000',
  hearingType: 'Case management preliminary hearing - open',
  hmcStatus: 'Update submitted',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv5',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'UPDATE SUBMITTED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [{
    hearingStartDateTime: '2021-04-12T09:00:00.000+0000',
    hearingEndDateTime: '2021-04-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
    hearingVenueId: 'venue 5',
    hearingRoomId: 'room 5',
    hearingPanel: []
  }],
  exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
  exuiDisplayStatus: EXUIDisplayStatusEnum.UPDATE_REQUESTED
}, {
  hearingID: 'h100006',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hearingType: 'Directions hearing',
  hmcStatus: 'Exception',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv6',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'EXCEPTION',
  listAssistCaseStatus: '',
  hearingDaySchedule: [{
    hearingStartDateTime: '2021-05-02T09:00:00.000+0000',
    hearingEndDateTime: '2021-05-02T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b55',
    hearingVenueId: 'venue 1',
    hearingRoomId: 'room 1',
    hearingPanel: []
  }],
  exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
  exuiDisplayStatus: EXUIDisplayStatusEnum.FAILURE
}, {
  hearingID: 'h100007',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hearingType: 'Full hearing',
  hmcStatus: 'Cancellation requested',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv7',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'CANCELLATION REQUESTED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [{
    hearingStartDateTime: '2021-07-12T09:00:00.000+0000',
    hearingEndDateTime: '2021-07-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b44',
    hearingVenueId: 'venue 2',
    hearingRoomId: 'room 2',
    hearingPanel: []
  }, {
    hearingStartDateTime: '2021-02-13T09:00:00.000+0000',
    hearingEndDateTime: '2021-02-13T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b34',
    hearingVenueId: 'venue 3',
    hearingRoomId: 'room 3',
    hearingPanel: []
  }],
  exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
  exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLATION_REQUESTED
}, {
  hearingID: 'h100009',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hearingType: 'Pre-hearing review',
  hmcStatus: 'Awaiting Actuals',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv9',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'AWAITING ACTUALS',
  listAssistCaseStatus: '',
  hearingDaySchedule: [{
    hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
    hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
    hearingVenueId: 'venue 4',
    hearingRoomId: 'room 4',
    hearingPanel: []
  }],
  exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
  exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_ACTUALS
}];

const PAST_HEARING_LIST: HearingListViewModel[] = [{
  hearingID: 'h100008',
  hearingRequestDateTime: '2021-09-14T16:00:00.000+0000',
  hearingType: 'Directions hearing',
  hmcStatus: 'Vacated',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv8',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'VACATED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [],
  exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
  exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLED
}, {
  hearingID: 'h100010',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hearingType: 'Case management preliminary hearing - open',
  hmcStatus: 'Completed',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv10',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'COMPLETED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [{
    hearingStartDateTime: '2021-04-12T09:00:00.000+0000',
    hearingEndDateTime: '2021-04-12T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b66',
    hearingVenueId: 'venue 5',
    hearingRoomId: 'room 5',
    hearingPanel: []
  }],
  exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
  exuiDisplayStatus: EXUIDisplayStatusEnum.COMPLETED
}, {
  hearingID: 'h100011',
  hearingRequestDateTime: '2021-09-14T16:00:00.000+0000',
  hearingType: 'Remedy hearing',
  hmcStatus: 'Adjourned',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv11',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'ADJOURNED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [{
    hearingStartDateTime: '2021-09-01T09:00:00.000+0000',
    hearingEndDateTime: '2021-09-01T16:00:00.000+0000',
    listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b33',
    hearingVenueId: 'venue 11',
    hearingRoomId: 'room 11',
    hearingPanel: []
  }],
  exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
  exuiDisplayStatus: EXUIDisplayStatusEnum.ADJOURNED
}, {
  hearingID: 'h100012',
  hearingRequestDateTime: '2021-10-14T16:00:00.000+0000',
  hearingType: 'Full hearing',
  hmcStatus: 'Vacated',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv12',
  earliestHearingStartDateTime: '',
  hearingListingStatus: 'VACATED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [],
  exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
  exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLED
}];

describe('CaseHearingsListComponent', () => {
  let component: CaseHearingsListComponent;
  let roleCategoryMappingService: RoleCategoryMappingService;
  let fixture: ComponentFixture<CaseHearingsListComponent>;
  const mockFeatureService = new MockRoleCategoryMappingService();
  const mockStore = jasmine.createSpyObj('Store', ['dispatch']);
  let router: any;
  /*  const HEARINGS: HearingListViewModel[] = [{
      hearingID: 'h555555',
      hearingType: 'Directions hearing',
      hmcStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
      hearingRequestDateTime: '2021-08-05T16:00:00.000+0000',
      lastResponseReceivedDateTime: '',
      responseVersion: 'rv5',
      earliestHearingStartDateTime: '',
      hearingListingStatus: HearingListingStatusEnum.CANCELLED,
      listAssistCaseStatus: '',
      exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
      exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLED,
      hearingDaySchedule: [],
    }, {
      hearingID: 'h555555',
      lastResponseReceivedDateTime: '',
      hearingType: 'Directions hearing',
      hearingRequestDateTime: '2021-08-05T16:00:00.000+0000',
      hmcStatus: EXUISectionStatusEnum.UPCOMING,
      responseVersion: 'rv5',
      earliestHearingStartDateTime: '',
      hearingListingStatus: HearingListingStatusEnum.CANCELLED,
      listAssistCaseStatus: '',
      exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
      exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLED,
      hearingDaySchedule: [],
    }];*/

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes([]),
        HearingsPipesModule
      ],
      declarations: [CaseHearingsListComponent],
      providers: [
        {
          provide: Store,
          useValue: mockStore
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                cid: '1111222233334444'
              },
            }
          }
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CaseHearingsListComponent);
    roleCategoryMappingService = new RoleCategoryMappingService(mockFeatureService);
    component = fixture.componentInstance;
    component.status = EXUISectionStatusEnum.PAST_AND_CANCELLED;
    component.hearingList$ = of(UPCOMING_HEARING_LIST);
    component.actions = [Actions.DELETE];
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show only past and cancelling', () => {
    component.status = EXUISectionStatusEnum.UPCOMING;
    fixture.detectChanges();

    const heading = fixture.debugElement.query(By.css('.govuk-body-lead'));
    expect(heading.nativeElement.innerHTML).toEqual(EXUISectionStatusEnum.UPCOMING);
  });

  it('should hasReadOnlyAction if status is past and cancelled', () => {
    component.status = EXUISectionStatusEnum.PAST_AND_CANCELLED;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasReadOnlyAction).toBeTruthy();
  });

  it('should hasUpdateAction if status upcoming', () => {
    component.status = EXUISectionStatusEnum.UPCOMING;
    component.actions = [Actions.UPDATE, Actions.DELETE];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasUpdateAction).toBeTruthy();
  });

  it('should hasUpdateAction if status upcoming', () => {
    component.status = EXUISectionStatusEnum.UPCOMING;
    component.actions = [Actions.UPDATE, Actions.DELETE];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasDeleteAction).toBeTruthy();
  });

  it('should hasReadOnlyAction if status upcoming', () => {
    component.status = EXUISectionStatusEnum.UPCOMING;
    component.actions = [Actions.READ];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hasReadOnlyAction).toBeTruthy();
  });

  it('should return true if on awaiting actual state', () => {
    expect(component.isAwaitingActual(EXUIDisplayStatusEnum.AWAITING_ACTUALS)).toBeTruthy();
  });

  it('should return isNonCancellable is true if on CANCELLATION_REQUESTED state', () => {
    expect(component.isNonCancellable(EXUIDisplayStatusEnum.CANCELLATION_REQUESTED)).toBeTruthy();
  });

  it('should return isNonCancellable is true if on FAILURE state', () => {
    expect(component.isNonCancellable(EXUIDisplayStatusEnum.CANCELLATION_REQUESTED)).toBeTruthy();
  });

  it('should return isNonCancellable is false if on other state', () => {
    expect(component.isNonCancellable(EXUIDisplayStatusEnum.UPDATE_REQUESTED)).toBeFalsy();
  });

  fit('should return isNonCancellable is false if on other state', () => {
    component.status = EXUISectionStatusEnum.UPCOMING;
    component.actions = [Actions.CREATE, Actions.DELETE, Actions.UPDATE, Actions.READ];
    component.ngOnInit();
    fixture.detectChanges();
    const actionElement1 = fixture.debugElement.query(By.css('#link-add-or-edit-h100009')).nativeElement;
    const actionElement2 = fixture.debugElement.query(By.css('#link-view-details-h100006')).nativeElement;
    const actionElement3 = fixture.debugElement.query(By.css('#link-view-details-h100007')).nativeElement;
    console.log('actionElement1', actionElement1.textContent);
    console.log('actionElement2', actionElement2.textContent);
    console.log('actionElement3', actionElement3.textContent);
  });

  it('should viewAndEdit', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.viewAndEdit('h100000');
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.LoadHearingValues('1111222233334444'));
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.LoadHearingRequest('h100000'));
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.SaveHearingConditions({mode: 'view'}));
    expect(navigateSpy).toHaveBeenCalledWith(['/', 'hearings', 'request', 'hearing-view-edit-summary']);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
