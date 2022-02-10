import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {WelshHiddenConverter} from './welsh.hidden.converter';

describe('WelshHiddenConverter', () => {

  let welshHiddenConverter: WelshHiddenConverter;

  beforeEach(() => {
    welshHiddenConverter = new WelshHiddenConverter();
  });

  it('should transform hidden of welsh answer', () => {
    const STATE: State = initialState.hearings;
    const result$ = welshHiddenConverter.transformHidden(of(STATE));
    const showWelshPage = true;
    const expected = cold('(b|)', {b: showWelshPage});
    expect(result$).toBeObservable(expected);
  });

});
