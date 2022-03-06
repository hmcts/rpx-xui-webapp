import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {AnswerSource} from '../models/hearings.enum';
import {State} from '../store/reducers';
import {IsAmendedPipe} from './is-amended.pipe';

describe('IsAmendedPipe', () => {

  let isAmendedPipe: IsAmendedPipe;

  beforeEach(() => {
    isAmendedPipe = new IsAmendedPipe();
  });

  it('should transform is amended for venue', () => {
    const STATE: State = initialState.hearings;
    const result$ = isAmendedPipe.transform(AnswerSource.VENUE, of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

  it('should transform is amended for additional security required', () => {
    const STATE: State = initialState.hearings;
    const result$ = isAmendedPipe.transform(AnswerSource.ADDITIONAL_SECURITY_REQUIRED, of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

  it('should transform is amended for additional facilities required', () => {
    const STATE: State = initialState.hearings;
    const result$ = isAmendedPipe.transform(AnswerSource.ATTENDANT_PERSON_AMOUNT, of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

  it('should transform is amended for additional facilities required', () => {
    const STATE: State = initialState.hearings;
    const result$ = isAmendedPipe.transform(AnswerSource.PANEL_INCLUSION, of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

  it('should transform is amended for additional facilities required', () => {
    const STATE: State = initialState.hearings;
    const result$ = isAmendedPipe.transform(AnswerSource.PANEL_EXCLUSION, of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

  it('should transform is amended for additional facilities required', () => {
    const STATE: State = initialState.hearings;
    const result$ = isAmendedPipe.transform(AnswerSource.PANEL_ROLES, of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });
});
