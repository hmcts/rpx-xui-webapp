import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { hearingPriorityRefData, initialState } from '../hearing.test.data';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { HearingPriorityAnswerConverter } from './hearing-priority.answer.converter';

describe('HearingPriorityAnswerConverter', () => {

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
                hearingPriorities: hearingPriorityRefData,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new HearingPriorityAnswerConverter(router);
  });

  it('should transform hearing stage', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingPriorityType = 'Standard';
    const expected = cold('(b|)', {b: hearingPriorityType});
    expect(result$).toBeObservable(expected);
  });

});
