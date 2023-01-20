import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { hearingStageRefData, initialState } from '../hearing.test.data';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { StageAnswerConverter } from './stage.answer.converter';

describe('StageAnswerConverter', () => {

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
    converter = new StageAnswerConverter(router);
  });

  it('should transform hearing stage', () => {
    const STATE = initialState.hearings as unknown as State;
    const result$ = converter.transformAnswer(of(STATE));
    const hearingType = 'Final';
    const expected = cold('(b|)', {b: hearingType});
    expect(result$).toBeObservable(expected);
  });

});
