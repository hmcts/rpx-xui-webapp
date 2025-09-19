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
    } as any;
    const result$ = judgeNameHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: false });
    expect(result$).toBeObservable(expected);
  });

  it('should return false when amendments are enabled, even with no data', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingConditions = {
      ...STATE.hearingConditions,
      isHearingAmendmentsEnabled: true
    } as any;
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = null as any;

    const result$ = judgeNameHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: false });
    expect(result$).toBeObservable(expected);
  });

  it('should return true when panelPreferences is an empty array', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: []
    } as any;

    const result$ = judgeNameHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: true });
    expect(result$).toBeObservable(expected);
  });

  it('should return true when no JUDGE/MUSTINC entries are present', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        { memberID: 'X0001', memberType: MemberType.PANEL_MEMBER, requirementType: RequirementType.MUSTINC },
        { memberID: 'P0000002', memberType: MemberType.JUDGE, requirementType: RequirementType.EXCLUDE }
      ]
    } as any;

    const result$ = judgeNameHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: true });
    expect(result$).toBeObservable(expected);
  });

  it('should return true when panelRequirements is undefined', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = undefined as any;

    const result$ = judgeNameHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: true });
    expect(result$).toBeObservable(expected);
  });

  it('should return true when panelPreferences is null', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: null
    } as any;

    const result$ = judgeNameHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: true });
    expect(result$).toBeObservable(expected);
  });

  it('should return false when at least one JUDGE/MUSTINC entry exists among others', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        { memberID: 'X0001', memberType: MemberType.PANEL_MEMBER, requirementType: RequirementType.MUSTINC },
        { memberID: 'P0000003', memberType: MemberType.JUDGE, requirementType: RequirementType.MUSTINC },
        { memberID: 'P0000004', memberType: MemberType.JUDGE, requirementType: RequirementType.EXCLUDE }
      ]
    } as any;

    const result$ = judgeNameHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: false });
    expect(result$).toBeObservable(expected);
  });
});
