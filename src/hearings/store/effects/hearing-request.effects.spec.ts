import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs/internal/observable/of';
import { initialState } from 'src/hearings/containers/request-hearing/hearing.store.state.test';
import { Go } from '../../../app/store/actions';
import { HearingRequestMainModel } from '../../models/hearingRequestMain.model';
import { HearingListingStatusEnum, HMCStatus } from '../../models/hearings.enum';
import { HearingsService } from '../../services/hearings.service';
import { AbstractPageFlow } from '../../utils/abstract-page-flow';
import * as hearingRequestActions from '../actions/hearing-request.action';
import { HearingRequestEffects } from './hearing-request.effects';

describe('Hearing Request Effects', () => {
  const actions$ = null;
  let effects: HearingRequestEffects;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'getAllHearings', 'cancelHearingRequest'
  ]);
  const pageflowMock = jasmine.createSpyObj('AbstractPageFlow', [
    'getCurrentPage', 'getLastPage', 'getNextPage'
  ]);

  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: HearingsService,
          useValue: hearingsServiceMock,
        },
        {
          provide: AbstractPageFlow,
          useValue: pageflowMock,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        HearingRequestEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(HearingRequestEffects);
  });

  describe('backBeginningNavigation$', () => {
    const HEARING_REQUEST_MAIN_MODEL = initialState.hearings.hearingRequest.hearingRequestMainModel as HearingRequestMainModel;
    const HEARING_ID = 'h00001';

    HEARING_REQUEST_MAIN_MODEL.hearingDetails.cancelationReason = [
      {
        key: 'reasonone',
        value_en: 'Reason 1',
        value_cy: '',
        hintText_EN: 'Reason 1',
        hintTextCY: '',
        order: 1,
        parentKey: null,
      }];

    HEARING_REQUEST_MAIN_MODEL.hearingDetails.cancelledCaseHearing = {
      hearingID: HEARING_ID,
      hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
      hearingType: 'Case management hearing',
      hmcStatus: HMCStatus.HEARING_REQUESTD,
      lastResponseReceivedDateTime: '',
      responseVersion: 'rv1',
      hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
      listAssistCaseStatus: '',
      hearingDaySchedule: null,
    };

    const CANCEL_HEARING_REQUEST_RESPONSE = {
      hearingID: HEARING_ID,
      hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
      hearingType: 'Case management hearing',
      hmcStatus: HMCStatus.HEARING_REQUESTD,
      lastResponseReceivedDateTime: '',
      responseVersion: 'rv1',
      hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
      listAssistCaseStatus: '',
      hearingDaySchedule: null,
    };

    it('should return a response with service hearing values', () => {
      hearingsServiceMock.cancelHearingRequest.and.returnValue(of(CANCEL_HEARING_REQUEST_RESPONSE));
      const action = new hearingRequestActions.NavigateBeginningCancelRequest(HEARING_REQUEST_MAIN_MODEL);
      effects.backBeginningNavigation$.subscribe(x => {
        expect(effects['router'].navigate).toHaveBeenCalled();
      });
    });
  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = HearingRequestEffects.handleError({
        status: 500,
        message: 'error'
      });
      action$.subscribe(action => expect(action).toEqual(new Go({ path: ['/service-down'] })));
    });
  });
});
