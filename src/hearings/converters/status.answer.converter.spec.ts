import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {LaCaseStatus} from '../models/hearings.enum';
import {State} from '../store/reducers';
import {StatusAnswerConverter} from './status.answer.converter';

describe('StatusAnswerConverter', () => {

  let statusAnswerConverter: StatusAnswerConverter;

  beforeEach(() => {
    statusAnswerConverter = new StatusAnswerConverter();
  });

  it('should transform type from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = statusAnswerConverter.transformAnswer(of(STATE));
    const type = LaCaseStatus.AWAITING_LISTING;
    const expected = cold('(b|)', {b: type});
    expect(result$).toBeObservable(expected);
  });

});
