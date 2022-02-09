import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {initialState} from '../hearing.test.data';
import {AbstractConverter} from './abstract.converter';
import {CaseNameConverter} from './case-name.converter';

describe('CaseNameConverter', () => {

  let converter: AbstractConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    converter = new CaseNameConverter(store);
  });

  it('should transform case name', () => {
    const result$ = converter.transformAnswer();
    const caseName = 'Jane vs DWP';
    const expected = cold('b', {b: caseName});
    expect(result$).toBeObservable(expected);
  });

});
