import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {initialState} from '../hearing.store.state.test';
import {AnswerSource} from '../models/hearings.enum';
import {HearingAnswersPipe} from './hearing-answers.pipe';

describe('HearingAnswersPipe', () => {

  let hearingAnswersPipe: HearingAnswersPipe;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    hearingAnswersPipe = new HearingAnswersPipe(store);
  });

  it('should transform case name', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_NAME);
    const caseName = 'Jane vs DWP';
    const expected = cold('b', {b: caseName});
    expect(result$).toBeObservable(expected);
  });

  it('should transform type', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.Type);
    const type = 'Personal Independence Payment \n<ul><li>- Conditions of Entitlement</li><li>- Good cause</li><li>- Rate of Assessment / Payability Issues - complex</li></ul>';
    const expected = cold('b', {b: type});
    expect(result$).toBeObservable(expected);
  });
});
