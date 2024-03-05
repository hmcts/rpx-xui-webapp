import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { NeedJudgeAmendedConverter } from './need-judge.amended.converter';
import { MemberType, RequirementType } from '../models/hearings.enum';

describe('NeedJudgeAmendedConverter', () => {
  let needJudgeAmendedConverter: NeedJudgeAmendedConverter;

  beforeEach(() => {
    needJudgeAmendedConverter = new NeedJudgeAmendedConverter();
  });

  it('should transform judge needed flag based on selection', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [{
        memberID: '123',
        memberType: MemberType.JUDGE,
        requirementType: RequirementType.MUSTINC
      }]
    };
    const result$ = needJudgeAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', { b: isAmended });
    expect(result$).toBeObservable(expected);
  });
});
