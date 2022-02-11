import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {TypeAnswerConverter} from './type.answer.converter';

describe('TypeAnswerConverter', () => {

  let typeAnswerConverter: TypeAnswerConverter;

  beforeEach(() => {
    typeAnswerConverter = new TypeAnswerConverter();
  });

  it('should transform type', () => {
    const STATE: State = initialState.hearings;
    const result$ = typeAnswerConverter.transformAnswer(of(STATE));
    const type = 'Personal Independence Payment \n<ul><li>- Conditions of Entitlement</li><li>- Good cause</li><li>- Rate of Assessment / Payability Issues - complex</li></ul>';
    const expected = cold('(b|)', {b: type});
    expect(result$).toBeObservable(expected);
  });

});
