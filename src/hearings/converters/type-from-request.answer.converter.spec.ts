import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {TypeFromRequestAnswerConverter} from './type-from-request.answer.converter';

describe('TypeFromRequestAnswerConverter', () => {

  let typeFromRequestAnswerConverter: TypeFromRequestAnswerConverter;

  beforeEach(() => {
    typeFromRequestAnswerConverter = new TypeFromRequestAnswerConverter();
  });

  it('should transform type from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = typeFromRequestAnswerConverter.transformAnswer(of(STATE));
    const type = 'Personal Independence Payment \n<ul><li>- Conditions of Entitlement</li><li>- Good cause</li><li>- Rate of Assessment / Payability Issues - complex</li></ul>';
    const expected = cold('(b|)', {b: type});
    expect(result$).toBeObservable(expected);
  });

});
