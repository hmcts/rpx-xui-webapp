import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { JudgeNameHiddenConverter } from './judge-name.hidden.converter';

describe('JudgeNameHiddenConverter', () => {
  let judgeNameHiddenConverter: JudgeNameHiddenConverter;
  const JUDICAIL_USER_DETAILS = [{
    memberID: 'P0000001',
    memberType: MemberType.JUDGE,
    requirementType: RequirementType.MUSTINC
  }];

  beforeEach(() => {
    judgeNameHiddenConverter = new JudgeNameHiddenConverter();
  });

  it('should transform hidden of true answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = null;
    const result$ = judgeNameHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: true });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hidden of false answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: JUDICAIL_USER_DETAILS
    };
    const result$ = judgeNameHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: false });
    expect(result$).toBeObservable(expected);
  });
});
