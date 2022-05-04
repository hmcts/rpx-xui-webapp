import {cold} from 'jasmine-marbles';
import * as _ from 'lodash';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {MemberType, RequirementType} from '../models/hearings.enum';
import {State} from '../store/reducers';
import {JudgeNameAmendedConverter} from './judge-name.amended.converter';

describe('JudgeNameAmendedConverter', () => {

  let judgeNameAmendedConverter: JudgeNameAmendedConverter;

  beforeEach(() => {
    judgeNameAmendedConverter = new JudgeNameAmendedConverter();
  });

  it('should transform judge name amended flag based on selection', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {};
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences = [{
      memberID: 'P000001',
      memberType: MemberType.JUDGE,
      requirementType: RequirementType.MUSTINC
    }];
    const result$ = judgeNameAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

});
