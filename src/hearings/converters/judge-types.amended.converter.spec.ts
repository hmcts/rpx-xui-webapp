import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { JudgeTypesAmendedConverter } from './judge-types.amended.converter';
import { MemberType, RequirementType } from '../models/hearings.enum';

describe('JudgeTypesAmendedConverter', () => {
  let judgeTypesAmendedConverter: JudgeTypesAmendedConverter;

  beforeEach(() => {
    judgeTypesAmendedConverter = new JudgeTypesAmendedConverter();
  });

  it('should transform judge type amended flag to true based on selection', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [],
      roleType: ['role1']
    };
    STATE.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [],
      roleType: []
    };
    const result$ = judgeTypesAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', { b: isAmended });
    expect(result$).toBeObservable(expected);
  });

  it('should transform judge type amended flag to false based on selection', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [{
        memberID: '123',
        memberType: MemberType.JUDGE,
        requirementType: RequirementType.MUSTINC
      }],
      roleType: ['role1']
    };
    STATE.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [],
      roleType: []
    };
    const result$ = judgeTypesAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', { b: isAmended });
    expect(result$).toBeObservable(expected);
  });
});
