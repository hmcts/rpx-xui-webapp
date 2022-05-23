import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {VenueAmendedConverter} from './venue.amended.converter';

describe('VenueAmendedConverter', () => {

  let venueAmendedConverter: VenueAmendedConverter;

  beforeEach(() => {
    venueAmendedConverter = new VenueAmendedConverter();
  });

  it('should transform is amended for venue', () => {
    const STATE: State = initialState.hearings;
    const result$ = venueAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

});
