import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {initialState} from '../hearing.test.data';
import {NeedWelshAnswerConverter} from './need-welsh.answer.converter';

describe('NeedWelshAnswerConverter', () => {

  let needWelshAnswerConverter: NeedWelshAnswerConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    needWelshAnswerConverter = new NeedWelshAnswerConverter(store);
  });

  it('should transform need welsh answer', () => {
    const result$ = needWelshAnswerConverter.transformAnswer();
    const needWelsh = 'Yes';
    const expected = cold('b', {b: needWelsh});
    expect(result$).toBeObservable(expected);
  });

});
