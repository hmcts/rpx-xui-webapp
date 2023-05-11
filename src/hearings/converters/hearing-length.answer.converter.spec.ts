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
import { HearingLengthAnswerConverter } from './hearing-length.answer.converter';

describe('HearingLengthAnswerConverter', () => {
  let converter: AnswerConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingStageOptions: hearingStageRefData
              }
            }
          }
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new HearingLengthAnswerConverter();
  });

  it('should transform hearing stage days', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 360;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '1 Day';
    const expected = cold('(b|)', { b: hearingDuration });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage hours', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 60;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '1 Hour';
    const expected = cold('(b|)', { b: hearingDuration });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage minutes', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 45;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '45 Minutes';
    const expected = cold('(b|)', { b: hearingDuration });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage days, hours and minutes', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 1365;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '3 Days 4 Hours 45 Minutes';
    const expected = cold('(b|)', { b: hearingDuration });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage days and hours', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 960;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '2 Days 4 Hours';
    const expected = cold('(b|)', { b: hearingDuration });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage days and minutes', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 750;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '2 Days 30 Minutes';
    const expected = cold('(b|)', { b: hearingDuration });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage both hours and minutes', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 70;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '1 Hour 10 Minutes';
    const expected = cold('(b|)', { b: hearingDuration });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage empty', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = null;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '';
    const expected = cold('(b|)', { b: hearingDuration });
    expect(result$).toBeObservable(expected);
  });
});
