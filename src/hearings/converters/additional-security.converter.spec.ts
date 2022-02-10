import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {initialState} from '../hearing.test.data';
import {AbstractConverter} from './abstract.converter';
import {AdditionalSecurityConverter} from './additional-security.converter';

describe('AdditionalSecurityConverter', () => {

  let converter: AbstractConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    converter = new AdditionalSecurityConverter(store);
  });

  it('should transform additional security converter', () => {
    const result$ = converter.transformAnswer();
    const expected = cold('b', {b: 'No'});
    expect(result$).toBeObservable(expected);
  });

});
