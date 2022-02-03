import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {caseFlagsRefData, initialState} from '../hearing.test.data';
import {AbstractConverter} from './abstract.converter';
import {CaseFlagConverter} from './case-flag.converter';

fdescribe('CaseFlagConverter', () => {

  let converter: AbstractConverter;
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
    converter = new CaseFlagConverter(store, router);
  });

  it('should transform case flag', () => {
    const result$ = converter.transformAnswer();
    const caseFlags = '<strong class="bold">Jane Smith</strong>\n<ul><li>Sign Language Interpreter</li><li>Hearing Loop</li><li>Larger font size</li><li>Reading documents for customer</li><li>Sign Language Interpreter</li><li>Language Interpreter</li></ul><br><strong class="bold">DWP</strong>\n<ul><li>Physical access and facilities</li></ul><br>';
    const expected = cold('b', {b: caseFlags});
    expect(result$).toBeObservable(expected);
  });

});
