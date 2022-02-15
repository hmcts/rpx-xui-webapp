import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
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

  it('should transform hearing stage', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingDuration = '1 hour(s)';
    const expected = cold('(b|)', {b: hearingDuration});
    expect(result$).toBeObservable(expected);
  });

});
