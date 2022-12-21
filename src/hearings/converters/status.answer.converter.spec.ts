import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {EXUIDisplayStatusEnum} from '../models/hearings.enum';
import {State} from '../store/reducers';
import {StatusAnswerConverter} from './status.answer.converter';

describe('StatusAnswerConverter', () => {

  let statusAnswerConverter: StatusAnswerConverter;

  beforeEach(() => {
    statusAnswerConverter = new StatusAnswerConverter();
  });

  it('should transform status from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = statusAnswerConverter.transformAnswer(of(STATE));
    const status = EXUIDisplayStatusEnum.LISTED;
    const expected = cold('(b|)', {b: status});
    expect(result$).toBeObservable(expected);
  });

});
