import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {caseFlagsRefData, initialState} from '../hearing.test.data';
import {AnswerSource} from '../models/hearings.enum';
import {HearingAnswersPipe} from './hearing-answers.pipe';

describe('HearingAnswersPipe', () => {

  let hearingAnswersPipe: HearingAnswersPipe;
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
    hearingAnswersPipe = new HearingAnswersPipe(store, router);
  });

  it('should transform case name', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_NAME);
    const caseName = 'Jane vs DWP';
    const expected = cold('b', {b: caseName});
    expect(result$).toBeObservable(expected);
  });

  it('should transform type', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.Type);
    const type = 'Personal Independence Payment \n<ul><li>- Conditions of Entitlement</li><li>- Good cause</li><li>- Rate of Assessment / Payability Issues - complex</li></ul>';
    const expected = cold('b', {b: type});
    expect(result$).toBeObservable(expected);
  });

  it('should transform case flag', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_FLAGS);
    const caseFlags = '<strong class=\'bold\'>Jane Smith</strong>\n<ul><li>Sign Language Interpreter</li><li>Hearing Loop</li><li>Larger font size</li><li>Reading documents for customer</li><li>Sign Language Interpreter</li><li>Language Interpreter</li></ul><br><strong class=\'bold\'>DWP</strong>\n<ul><li>Physical access and facilities</li></ul><br>';
    const expected = cold('(b|)', {b: caseFlags});
    expect(result$).toBeObservable(expected);
  });

});
