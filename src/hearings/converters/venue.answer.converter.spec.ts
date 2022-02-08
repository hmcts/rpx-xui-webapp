import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {initialState} from '../hearing.test.data';
import {VenueAnswerConverter} from './venue.answer.converter';

describe('VenueAnswerConverter', () => {

  let venueAnswerConverter: VenueAnswerConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    venueAnswerConverter = new VenueAnswerConverter(store);
  });

  it('should transform type', () => {
    const result$ = venueAnswerConverter.transformAnswer();
    const type = '<ul><li>LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL</li><li>ABERDEEN TRIBUNAL HEARING CENTRE</li></ul>';
    const expected = cold('b', {b: type});
    expect(result$).toBeObservable(expected);
  });

});
