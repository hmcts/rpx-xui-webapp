import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {AdditionalFacilitiesAmendedConverter} from './additional-facilities.amended.converter';

describe('AdditionalFacilitiesAmendedConverter', () => {

  let additionalFacilitiesAmendedConverter: AdditionalFacilitiesAmendedConverter;

  beforeEach(() => {
    additionalFacilitiesAmendedConverter = new AdditionalFacilitiesAmendedConverter();
  });

  it('should transform is amended for additional facilities required', () => {
    const STATE: State = initialState.hearings;
    const result$ = additionalFacilitiesAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

});
