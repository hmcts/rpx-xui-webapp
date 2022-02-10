import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {initialState} from '../hearing.test.data';
import {AbstractConverter} from './abstract.converter';
import {AdditionalInstructionsConverter} from './additional-instructions.converter';

describe('AdditionalInstructionsConverter', () => {

  let converter: AbstractConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    converter = new AdditionalInstructionsConverter(store);
  });

  it('should transform additional instructions', () => {
    const result$ = converter.transformAnswer();
    const listingComments = 'blah blah blah';
    const expected = cold('b', {b: listingComments});
    expect(result$).toBeObservable(expected);
  });

});
