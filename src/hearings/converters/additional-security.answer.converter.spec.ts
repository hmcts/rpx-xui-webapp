import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {AdditionalSecurityAnswerConverter} from './additional-security.answer.converter';
import {AnswerConverter} from './answer.converter';

describe('AdditionalSecurityAnswerConverter', () => {

  let converter: AnswerConverter;

  beforeEach(() => {
    converter = new AdditionalSecurityAnswerConverter();
  });

  it('should transform additional security converter', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', {b: 'No'});
    expect(result$).toBeObservable(expected);
  });

});
