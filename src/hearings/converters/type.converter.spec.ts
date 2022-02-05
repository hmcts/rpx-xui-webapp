import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {initialState} from '../hearing.test.data';
import {TypeConverter} from './type.converter';

describe('TypeConverter', () => {

  let typeConverter: TypeConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    typeConverter = new TypeConverter(store);
  });

  it('should transform type', () => {
    const result$ = typeConverter.transformAnswer();
    const type = 'Personal Independence Payment \n<ul><li>- Conditions of Entitlement</li><li>- Good cause</li><li>- Rate of Assessment / Payability Issues - complex</li></ul>';
    const expected = cold('b', {b: type});
    expect(result$).toBeObservable(expected);
  });

});
