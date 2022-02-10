import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {cold} from 'jasmine-marbles';
import {of, Subscription} from 'rxjs';
import {caseFlagsRefData, initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {CaseFlagAnswerConverter} from './case-flag.answer.converter';

describe('CaseFlagAnswerConverter', () => {

  let caseFlagConverter: CaseFlagAnswerConverter;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                caseFlags: caseFlagsRefData,
              },
            },
          },
        }
      ]
    });
    router = TestBed.get(ActivatedRoute);
    caseFlagConverter = new CaseFlagAnswerConverter(router);
    caseFlagConverter.storeSub = new Subscription();
  });

  it('should transform case flag', () => {
    const STATE: State = initialState.hearings;
    const result$ = caseFlagConverter.transformAnswer(of(STATE));
    const caseFlags = '<strong class=\'bold\'>Jane Smith</strong>\n<ul><li>Sign Language Interpreter</li><li>Hearing Loop</li><li>Larger font size</li><li>Reading documents for customer</li><li>Sign Language Interpreter</li><li>Language Interpreter</li></ul><br><strong class=\'bold\'>DWP</strong>\n<ul><li>Physical access and facilities</li></ul><br>';
    const expected = cold('(b|)', {b: caseFlags});
    expect(result$).toBeObservable(expected);
  });

  it('should destroy subscription', () => {
    const unsubSpy = spyOn(caseFlagConverter.storeSub, 'unsubscribe');
    caseFlagConverter.ngOnDestroy();
    expect(unsubSpy).toHaveBeenCalled();
  });
});
