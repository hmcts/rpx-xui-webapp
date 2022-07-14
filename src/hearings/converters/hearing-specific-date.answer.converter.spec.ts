import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import * as _ from 'lodash';
import {hearingStageRefData, initialState} from '../hearing.test.data';
import {RadioOptions} from '../models/hearings.enum';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';
import {HearingSpecificDateAnswerConverter} from './hearing-specific-date.answer.converter';

describe('HearingSpecificDateAnswerConverter', () => {

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
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new HearingSpecificDateAnswerConverter();
  });

  it('should transform hearing choose date range', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow = {
      dateRangeStart: '2022-12-12T09:00:00.000Z',
      dateRangeEnd: '2022-12-12T09:00:00.000Z',
      firstDateTimeMustBe: null
    };
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDateRange = `${RadioOptions.CHOOSE_DATE_RANGE}<dt class="heading-h3 bottom-0">Earliest hearing date</dt>12 December 2022<dt class="heading-h3 bottom-0">Latest hearing date</dt>12 December 2022`;
    const expected = cold('(b|)', {b: hearingDateRange});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing date range', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow = {
      dateRangeStart: null,
      dateRangeEnd: null,
      firstDateTimeMustBe: '2022-12-12T09:00:00.000Z',
    };
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDateRange = `${RadioOptions.YES}<dt class="heading-h3 bottom-0">The first date of the hearing must be</dt>12 December 2022`;
    const expected = cold('(b|)', {b: hearingDateRange});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing start date', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow = {
      dateRangeStart: '2022-12-12T09:00:00.000Z',
      dateRangeEnd: null,
      firstDateTimeMustBe: null
    };
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDateRange = `${RadioOptions.CHOOSE_DATE_RANGE}<dt class="heading-h3 bottom-0">Earliest hearing date</dt>12 December 2022`;
    const expected = cold('(b|)', {b: hearingDateRange});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing end date', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow = {
      dateRangeStart: null,
      dateRangeEnd: '2022-12-12T09:00:00.000Z',
      firstDateTimeMustBe: null
    };
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDateRange = `${RadioOptions.CHOOSE_DATE_RANGE}<dt class="heading-h3 bottom-0">Latest hearing date</dt>12 December 2022`;
    const expected = cold('(b|)', {b: hearingDateRange});
    expect(result$).toBeObservable(expected);
  });


  it('should transform hearing empty date', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow = null;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDateRange = RadioOptions.NO;
    const expected = cold('(b|)', {b: hearingDateRange});
    expect(result$).toBeObservable(expected);
  });
});
