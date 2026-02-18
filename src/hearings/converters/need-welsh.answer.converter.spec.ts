import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { NeedWelshAnswerConverter } from './need-welsh.answer.converter';

describe('NeedWelshAnswerConverter', () => {
  let needWelshAnswerConverter: NeedWelshAnswerConverter;

  beforeEach(() => {
    needWelshAnswerConverter = new NeedWelshAnswerConverter();
  });

  it('should transform need welsh answer', () => {
    const STATE: State = initialState.hearings;
    const result$ = needWelshAnswerConverter.transformAnswer(of(STATE));
    const needWelsh = 'Yes';
    const expected = cold('(b|)', { b: needWelsh });
    expect(result$).toBeObservable(expected);
  });
});
