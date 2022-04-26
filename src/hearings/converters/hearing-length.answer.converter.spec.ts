import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import * as _ from 'lodash';
import {of} from 'rxjs';
import {hearingStageRefData, initialState} from '../hearing.test.data';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';
import {HearingLengthAnswerConverter} from './hearing-length.answer.converter';

describe('HearingLengthAnswerConverter', () => {

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
    converter = new HearingLengthAnswerConverter();
  });

  it('should transform hearing stage hours', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 60;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '1 hour(s)';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage minutes', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 45;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '45 minutes';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage both hours and minutes', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 70;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '1 hour(s) and 10 minute(s)';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing stage empty', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = null;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });
});
