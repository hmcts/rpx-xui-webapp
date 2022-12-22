import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {AdditionalSecurityAmendedConverter} from './additional-security.amended.converter';

describe('AdditionalSecurityAmendedConverter', () => {

  let additionalSecurityAmendedConverter: AdditionalSecurityAmendedConverter;

  beforeEach(() => {
    additionalSecurityAmendedConverter = new AdditionalSecurityAmendedConverter();
  });

  it('should transform is amended for additional security required', () => {
    const STATE: State = initialState.hearings;
    const result$ = additionalSecurityAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

});
