import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { caseFlagsRefData, initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { CaseFlagAmendedConverter } from './case-flag.amended.converter';

describe('CaseFlagAmendedConverter', () => {
  let caseFlagAmendedConverter: CaseFlagAmendedConverter;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                caseFlags: caseFlagsRefData
              }
            }
          }
        }
      ]
    });
    router = TestBed.inject(ActivatedRoute);
    caseFlagAmendedConverter = new CaseFlagAmendedConverter(router);
  });

  it(' should transform isAmended for reasonable adjustment flags', () => {
    const STATE: State = initialState.hearings;
    const result$ = caseFlagAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', { b: isAmended });
    expect(result$).toBeObservable(expected);
  });
});
