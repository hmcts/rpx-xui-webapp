import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { hearingStageRefData, initialState } from '../hearing.test.data';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { HearingResponseLengthAnswerConverter } from './hearing-response-length.answer.converter';

describe('HearingResponseLengthAnswerConverter', () => {

  let converter: AnswerConverter;
  let store: Store<any>;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingStageOptions: hearingStageRefData,
              },
            },
          },
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new HearingResponseLengthAnswerConverter();
  });

  it('should transform hearing stage days', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingStartDateTime = '2022-07-11T09:00:00.000Z';
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingEndDateTime = '2022-07-13T09:00:00.000Z';
    const result$ = converter.transformAnswer(of(STATE), 0);
    const hearingDuration = '8 Days';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage hours', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingStartDateTime = '2021-03-12T09:00:00.000Z';
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingEndDateTime = '2021-03-12T10:00:00.000Z';
    const result$ = converter.transformAnswer(of(STATE), 0);
    const hearingDuration = '1 Hour';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage minutes', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingStartDateTime = '2021-03-12T09:00:00.000Z';
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingEndDateTime = '2021-03-12T09:45:00.000Z';
    const result$ = converter.transformAnswer(of(STATE), 0);
    const hearingDuration = '45 Minutes';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage both days and hours', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingStartDateTime = '2022-07-11T09:00:00.000Z';
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingEndDateTime = '2022-07-14T11:00:00.000Z';
    const result$ = converter.transformAnswer(of(STATE), 0);
    const hearingDuration = '12 Days 2 Hours';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage both hours and minutes', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingStartDateTime = '2021-03-12T09:00:00.000Z';
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingEndDateTime = '2021-03-12T10:10:00.000Z';
    const result$ = converter.transformAnswer(of(STATE), 0);
    const hearingDuration = '1 Hour 10 Minutes';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage days, hours and minutes', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingStartDateTime = '2022-07-11T09:00:00.000Z';
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingEndDateTime = '2022-07-14T14:10:00.000Z';
    const result$ = converter.transformAnswer(of(STATE), 0);
    const hearingDuration = '12 Days 5 Hours 10 Minutes';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });
});
