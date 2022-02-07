import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {Subscription} from 'rxjs';
import {caseFlagsRefData, initialState} from '../hearing.test.data';
import {CaseFlagConverter} from './case-flag.converter';

describe('CaseFlagConverter', () => {

  let caseFlagConverter: CaseFlagConverter;
  let store: Store<any>;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
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
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    caseFlagConverter = new CaseFlagConverter(store, router);
    caseFlagConverter.storeSub = new Subscription();
  });

  it('should transform case flag', () => {
    const result$ = caseFlagConverter.transformAnswer();
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
