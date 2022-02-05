import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../hearing.test.data';
import {DefaultConverter} from './default.converter';

describe('DefaultConverter', () => {

  let defaultConverter: DefaultConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    defaultConverter = new DefaultConverter(store);
  });

  it('should return default converter', () => {
    const result$ = defaultConverter.transformAnswer();
    const msg = 'Not implement yet';
    result$.subscribe(result => expect(result).toBe(msg));
  });

});
