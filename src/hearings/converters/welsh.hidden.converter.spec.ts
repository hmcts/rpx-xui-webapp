import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {initialState} from '../hearing.test.data';
import {WelshHiddenConverter} from './welsh.hidden.converter';

describe('WelshHiddenConverter', () => {

  let welshHiddenConverter: WelshHiddenConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    welshHiddenConverter = new WelshHiddenConverter(store);
  });

  it('should transform hidden of welsh answer', () => {
    const result$ = welshHiddenConverter.transformHidden();
    const showWelshPage = true;
    const expected = cold('b', {b: showWelshPage});
    expect(result$).toBeObservable(expected);
  });

});
