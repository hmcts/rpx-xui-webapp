import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {caseFlagsRefData, initialState} from '../hearing.test.data';
import {AnswerSource} from '../models/hearings.enum';
import {State} from '../store/reducers';
import {HearingAnswersPipe} from './hearing-answers.pipe';

describe('HearingAnswersPipe', () => {

  const STATE: State = initialState.hearings;
  let hearingAnswersPipe: HearingAnswersPipe;
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
    hearingAnswersPipe = new HearingAnswersPipe(router);
  });

  it('should transform case name', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_NAME, of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', {b: caseName});
    expect(result$).toBeObservable(expected);
  });

  it('should transform case number', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_NUMBER, of(STATE));
    const caseNumber = '1111-2222-3333-4444';
    const expected = cold('(b|)', {b: caseNumber});
    expect(result$).toBeObservable(expected);
  });

  it('should transform type', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.Type, of(STATE));
    const type = 'Personal Independence Payment \n<ul><li>- Conditions of Entitlement</li><li>- Good cause</li><li>- Rate of Assessment / Payability Issues - complex</li></ul>';
    const expected = cold('(b|)', {b: type});
    expect(result$).toBeObservable(expected);
  });

  it('should transform case flag', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_FLAGS, of(STATE));
    const caseFlags = '<strong class=\'bold\'>Jane Smith</strong>\n<ul><li>Sign Language Interpreter</li><li>Hearing Loop</li><li>Larger font size</li><li>Reading documents for customer</li><li>Sign Language Interpreter</li><li>Language Interpreter</li></ul><br><strong class=\'bold\'>DWP</strong>\n<ul><li>Physical access and facilities</li></ul><br>';
    const expected = cold('(b|)', {b: caseFlags});
    expect(result$).toBeObservable(expected);
  });

  it('should transform venue', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.VENUE, of(STATE));
    const caseFlags = '<ul><li>LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL</li><li>ABERDEEN TRIBUNAL HEARING CENTRE</li></ul>';
    const expected = cold('(b|)', {b: caseFlags});
    expect(result$).toBeObservable(expected);
  });

  it('should transform need welsh', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.NEED_WELSH, of(STATE));
    const needWelsh = 'Yes';
    const expected = cold('(b|)', {b: needWelsh});
    expect(result$).toBeObservable(expected);
  });
});
