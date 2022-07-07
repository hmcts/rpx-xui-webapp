import {cold} from 'jasmine-marbles';
import * as _ from 'lodash';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {LaCaseStatus} from '../models/hearings.enum';
import {State} from '../store/reducers';
import {NotListedHiddenConverter} from './not-listed.hidden.converter';

describe('NotListedHiddenConverter', () => {

  let notListedHiddenConverter: NotListedHiddenConverter;
  beforeEach(() => {
    notListedHiddenConverter = new NotListedHiddenConverter();
  });

  it('should transform hidden of true answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.laCaseStatus = LaCaseStatus.CLOSED;
    const result$ = notListedHiddenConverter.transformHidden(of(STATE));
    const showAnswer = true;
    const expected = cold('(b|)', {b: showAnswer});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hidden of false answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.laCaseStatus = LaCaseStatus.LISTED;
    const result$ = notListedHiddenConverter.transformHidden(of(STATE));
    const showAnswer = false;
    const expected = cold('(b|)', {b: showAnswer});
    expect(result$).toBeObservable(expected);
  });


});
