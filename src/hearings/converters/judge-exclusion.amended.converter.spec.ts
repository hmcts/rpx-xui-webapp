import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { JudgeExclusionAmendedConverter } from './judge-exclusion.amended.converter';

describe('JudgeExclusionAmendedConverter', () => {
  let judgeExclusionAmendedConverter: JudgeExclusionAmendedConverter;

  beforeEach(() => {
    judgeExclusionAmendedConverter = new JudgeExclusionAmendedConverter();
  });

  it('should transform judge exclude amened flag based on selection', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {};
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences = [{
      memberID: 'P000001',
      memberType: MemberType.JUDGE,
      requirementType: RequirementType.EXCLUDE
    }];
    const result$ = judgeExclusionAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', { b: isAmended });
    expect(result$).toBeObservable(expected);
  });
});
