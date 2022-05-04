import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { RadioOptions } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { LinkedHearingsAnswerConverter } from './linked-hearings.answer.converter';

describe('LinkedHearingsAnswerConverter', () => {
  let converter: AnswerConverter;
  beforeEach(() => {
    TestBed.configureTestingModule({

    });
    converter = new LinkedHearingsAnswerConverter();
  });

  it('should transform linked hearings answer selection to yes', () => {
    const STATE: State = initialState.hearings;
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingIsLinkedFlag = true;
    const result$ = converter.transformAnswer(of(STATE));
    const option = RadioOptions.YES;
    const expected = cold('(b|)', { b: option });
    expect(result$).toBeObservable(expected);
  });

  it('should transform linked hearings answer selection to no', () => {
    const STATE: State = initialState.hearings;
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingIsLinkedFlag = false;
    const result$ = converter.transformAnswer(of(STATE));
    const option = RadioOptions.NO;
    const expected = cold('(b|)', { b: option });
    expect(result$).toBeObservable(expected);
  });
});
