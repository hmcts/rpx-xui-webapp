import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { caseFlagsRefData, hearingPriorityRefData, initialState, partyChannelsRefData } from '../../hearing.test.data';
import { AnswerSource, PartyType, RadioOptions } from '../../models/hearings.enum';
import { State } from '../../store/reducers';
import { HearingAnswersPipe } from '../hearing-answers.pipe';

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
    hearingAnswersPipe = new HearingAnswersPipe(router);
  });

  it('should transform additional instructions', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.ADDITIONAL_INSTRUCTION, of(STATE));
    const listingComments = 'blah blah blah';
    const expected = cold('(b|)', { b: listingComments });
    expect(result$).toBeObservable(expected);
  });

  it('should transform case name', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_NAME, of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', { b: caseName });
    expect(result$).toBeObservable(expected);
  });

  it('should transform case number', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_NUMBER, of(STATE));
    const caseNumber = '1111-2222-3333-4444';
    const expected = cold('(b|)', { b: caseNumber });
    expect(result$).toBeObservable(expected);
  });

  it('should transform type', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.Type, of(STATE));
    const type = 'Personal Independence Payment \n<ul><li>- Conditions of Entitlement</li><li>- Good cause</li><li>- Rate of Assessment / Payability Issues - complex</li></ul>';
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });

  it('should transform case flag', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.CASE_FLAGS, of(STATE));
    const caseFlags = '<strong class=\'bold\'>Jane Smith</strong>\n<ul><li>Sign Language Interpreter</li><li>Hearing Loop</li><li>Larger font size</li><li>Reading documents for customer</li><li>Sign Language Interpreter</li><li>Language Interpreter</li></ul><br><strong class=\'bold\'>DWP</strong>\n<ul><li>Physical access and facilities</li></ul><br>';
    const expected = cold('(b|)', { b: caseFlags });
    expect(result$).toBeObservable(expected);
  });

  it('should transform party flags', () => {
    STATE.hearingRequest.hearingRequestMainModel.partyDetails = [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyChannel: 'inPerson'
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyChannel: 'byVideo'
      }
    ];
    const result$ = hearingAnswersPipe.transform(AnswerSource.HOW_ATTENDANT, of(STATE));
    const partyFlags = '<ul><li>Jane and Smith - In person</li><li>DWP - By video</li></ul>';
    const expected = cold('(b|)', { b: partyFlags });
    expect(result$).toBeObservable(expected);
  });

  it('should transform number of attendees', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.ATTENDANT_PERSON_AMOUNT, of(STATE));
    const expected = cold('(b|)', { b: '3' });
    expect(result$).toBeObservable(expected);
  });

  it('should transform venue', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.VENUE, of(STATE));
    const caseFlags = '<ul><li>LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL</li><li>ABERDEEN TRIBUNAL HEARING CENTRE</li></ul>';
    const expected = cold('(b|)', { b: caseFlags });
    expect(result$).toBeObservable(expected);
  });

  it('should transform need welsh', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.NEED_WELSH, of(STATE));
    const needWelsh = 'Yes';
    const expected = cold('(b|)', { b: needWelsh });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing length', () => {
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 60;
    const result$ = hearingAnswersPipe.transform(AnswerSource.HEARING_LENGTH, of(STATE));
    const hearingDuration = '1 hour(s)';
    const expected = cold('(b|)', { b: hearingDuration });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing specific date', () => {
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow = {
      hearingWindowDateRange: {
        hearingWindowStartDateRange: '12-12-2022',
        hearingWindowEndDateRange: '12-12-2022',
      },
      hearingWindowFirstDate: null,
    };
    const result$ = hearingAnswersPipe.transform(AnswerSource.HEARING_SPECIFIC_DATE, of(STATE));
    const hearingDateRange = `${RadioOptions.CHOOSE_DATE_RANGE}<dt class="heading-h3 bottom-0">Earliest hearing date</dt>12 December 2022<dt class="heading-h3 bottom-0">Latest hearing date</dt>12 December 2022`;
    const expected = cold('(b|)', { b: hearingDateRange });
    expect(result$).toBeObservable(expected);
  });

  it('should transform need hearing priority', () => {
    const result$ = hearingAnswersPipe.transform(AnswerSource.HEARING_PRIORITY, of(STATE));
    const hearingPriority = 'Standard';
    const expected = cold('(b|)', { b: hearingPriority });
    expect(result$).toBeObservable(expected);
  });
});
