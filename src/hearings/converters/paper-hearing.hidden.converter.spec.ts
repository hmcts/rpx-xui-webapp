import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { HearingChannelEnum } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { PaperHearingHiddenConverter } from './paper-hearing.hidden.converter';

describe('PaperHearingHiddenConverter', () => {

  let panelRolesHiddenConverter: PaperHearingHiddenConverter;
  beforeEach(() => {
    panelRolesHiddenConverter = new PaperHearingHiddenConverter();
  });

  it('should transform hidden of true answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingChannels.push(HearingChannelEnum.ONPPR);
    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const showAnswer = true;
    const expected = cold('(b|)', { b: showAnswer });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hidden of false answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingChannels = [];
    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const showAnswer = false;
    const expected = cold('(b|)', { b: showAnswer });
    expect(result$).toBeObservable(expected);
  });
});
