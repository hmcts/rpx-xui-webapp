import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {IsHiddenSource} from '../models/hearings.enum';
import {State} from '../store/reducers';
import {ShowHidePipe} from './show-hide.pipe';

describe('ShowHidePipe', () => {

  let showHidePipe: ShowHidePipe;

  beforeEach(() => {
    showHidePipe = new ShowHidePipe();
  });

  it('should transform is welsh page hidden', () => {
    const STATE: State = initialState.hearings;
    const result$ = showHidePipe.transform(IsHiddenSource.WELSH_LOCATION, of(STATE));
    const isHidden = true;
    const expected = cold('(b|)', {b: isHidden});
    expect(result$).toBeObservable(expected);
  });
});
