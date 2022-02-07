import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {initialState} from '../hearing.test.data';
import {TypeAnswerConverter} from './type.answer.converter';

describe('TypeAnswerConverter', () => {

  let typeAnswerConverter: TypeAnswerConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    typeAnswerConverter = new TypeAnswerConverter(store);
  });

  it('should transform type', () => {
    const result$ = typeAnswerConverter.transformAnswer();
    const type = 'Personal Independence Payment \n<ul><li>- Conditions of Entitlement</li><li>- Good cause</li><li>- Rate of Assessment / Payability Issues - complex</li></ul>';
    const expected = cold('b', {b: type});
    expect(result$).toBeObservable(expected);
  });

});
