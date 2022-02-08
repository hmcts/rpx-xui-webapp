import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../hearing.test.data';
import {DefaultHiddenConverter} from './default.hidden.converter';

describe('DefaultHiddenConverter', () => {

  let defaultHiddenConverter: DefaultHiddenConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    defaultHiddenConverter = new DefaultHiddenConverter(store);
  });

  it('should return default hidden converter', () => {
    const result$ = defaultHiddenConverter.transformHidden();
    const isHidden = false;
    result$.subscribe(result => expect(result).toBe(isHidden));
  });

});
