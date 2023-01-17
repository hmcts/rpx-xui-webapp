import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { AdditionalInstructionsAmendedConverter } from './additional-instructions.amended.converter';

describe('AdditionalInstructionsAmendedConverter', () => {

  let additionalInstructionsAmendedConverter: AdditionalInstructionsAmendedConverter;

  beforeEach(() => {
    additionalInstructionsAmendedConverter = new AdditionalInstructionsAmendedConverter();
  });

  it('should transform is amended for additional instructions', () => {
    const STATE: State = initialState.hearings;
    const result$ = additionalInstructionsAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

});
