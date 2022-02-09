import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../hearing.test.data';
import {AbstractConverter} from './abstract.converter';
import {DefaultConverter} from './default.converter';

describe('DefaultConverter', () => {

  let converter: AbstractConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    converter = new DefaultConverter(store);
  });

  it('should return default converter', () => {
    const result$ = converter.transformAnswer();
    const msg = 'Not implement yet';
    result$.subscribe(result => expect(result).toBe(msg));
  });

});
