import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { of } from 'rxjs';
import { Go } from '../../../app/store/actions';
import { CaseHearingModel } from '../../models/caseHearing.model';
import { CaseHearingsMainModel } from '../../models/caseHearingsMain.model';
import { HearingDayScheduleModel } from '../../models/hearingDaySchedule.model';
import { HearingsService } from '../../services/hearings.service';
import * as hearingsActions from '../actions/hearings.action';
import { HearingsEffects } from './hearings.effects';
import { HearingListingStatusEnum } from '../../models/hearings.enum';

describe('Hearings Effects', () => {
  let actions$;
  let effects: HearingsEffects;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'getAllHearings',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HearingsService,
          useValue: hearingsServiceMock,
        },
        HearingsEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(HearingsEffects);
  });

  describe('loadHearingsList$', () => {
    it('should return a response with hearings list', () => {
      const HEARING_DAY_SCHEDULE_1: HearingDayScheduleModel = {
        hearingStartDateTime: '2021-05-01T16:00:00.000+0000',
        hearingEndDateTime: '2021-05-04T16:00:00.000+0000',
        ListAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
        hearingVenueId: 'venue 1',
        hearingRoomId: 'room 1',
        hearingPanel: ['child'],
      };
      const CASE_HEARING_1: CaseHearingModel = {
        hearingID: 'h111111',
        hearingType: 'hearing type 1',
        hmcStatus: 'pending',
        lastResponseReceivedDateTime: '2021-05-05T16:00:00.000+0000',
        responseVersion: 'rv1',
        hearingListingStatus: HearingListingStatusEnum.WAITING_TO_BE_LISTED,
        listAssistCaseStatus: 'pending',
        hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
      };
      const HEARINGS_LIST: CaseHearingsMainModel = {
        hmctsServiceID: 'SSCS',
        caseRef: '1568642646198441',
        caseHearings: [CASE_HEARING_1],
      };
      hearingsServiceMock.getAllHearings.and.returnValue(of(HEARINGS_LIST));
      const action = new hearingsActions.LoadAllHearings('1111222233334444');
      const completion = new hearingsActions.LoadAllHearingsSuccess(HEARINGS_LIST);
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.loadHearingsList$).toBeObservable(expected);
    });
  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = HearingsEffects.handleError({status: 500, message: 'error'}, hearingsActions.LOAD_ALL_HEARINGS);
      action$.subscribe(action => expect(action).toEqual(new Go({path: ['/service-down']})));
    });
  });
});
