import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {caseFlagsRefData, hearingPriorityRefData, initialState, partyChannelsRefData} from '../hearing.test.data';
import {AnswerSource} from '../models/hearings.enum';
import {State} from '../store/reducers';
import {IsAmendedPipe} from './is-amended.pipe';

describe('IsAmendedPipe', () => {

  let isAmendedPipe: IsAmendedPipe;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingPriorities: hearingPriorityRefData,
                caseFlags: caseFlagsRefData,
                partyChannels: partyChannelsRefData,
              },
            },
          },
        }
      ]
    });
    router = TestBed.get(ActivatedRoute);
    isAmendedPipe = new IsAmendedPipe(router);
  });

  it('should transform is amended for reasonable adjustment flags', () => {
    const STATE: State = initialState.hearings;
    const result$ = isAmendedPipe.transform(AnswerSource.CASE_FLAGS, of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
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

  it('should transform is amended for additional person amount required', () => {
    const STATE: State = initialState.hearings;
    const result$ = isAmendedPipe.transform(AnswerSource.ATTENDANT_PERSON_AMOUNT, of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

  it('should transform is amended for panel inclusion', () => {
    const STATE: State = initialState.hearings;
    const result$ = isAmendedPipe.transform(AnswerSource.PANEL_INCLUSION, of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

  it('should transform is amended for panel exclusion', () => {
    const STATE: State = initialState.hearings;
    const result$ = isAmendedPipe.transform(AnswerSource.PANEL_EXCLUSION, of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

  it('should transform is amended for panel roles', () => {
    const STATE: State = initialState.hearings;
    const result$ = isAmendedPipe.transform(AnswerSource.PANEL_ROLES, of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });
});
