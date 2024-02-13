import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { HearingFacilitiesExclusionHiddenConverter } from './hearing-timing-exclusion.hidden.converter';

describe('HearingFacilitiesExclusionHiddenConverter', () => {
  let hearingFacilitiesExclusionHiddenConverter: HearingFacilitiesExclusionHiddenConverter;

  beforeEach(() => {
    hearingFacilitiesExclusionHiddenConverter = new HearingFacilitiesExclusionHiddenConverter();
  });

  it('should transform hidden of true answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingValues.serviceHearingValuesModel.screenFlow = null;
    const result$ = hearingFacilitiesExclusionHiddenConverter.transformHidden(of(STATE));
    const showWelshPage = true;
    const expected = cold('(b|)', { b: showWelshPage });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hidden of false answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    const result$ = hearingFacilitiesExclusionHiddenConverter.transformHidden(of(STATE));
    const showWelshPage = false;
    const expected = cold('(b|)', { b: showWelshPage });
    expect(result$).toBeObservable(expected);
  });
});
