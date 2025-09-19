import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store';
import { PanelRolesHiddenConverter } from './panel-roles.hidden.converter';
import { MemberType, RequirementType } from '../models/hearings.enum';

describe('PanelRolesHiddenConverter', () => {
  let panelRolesHiddenConverter: PanelRolesHiddenConverter;

  beforeEach(() => {
    panelRolesHiddenConverter = new PanelRolesHiddenConverter();
  });

  it('should transform hidden of true answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = null;
    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const showAnswer = true;
    const expected = cold('(b|)', { b: showAnswer });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hidden of false answer due to specialism', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: ['cardiologist']
    };
    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const showAnswer = false;
    const expected = cold('(b|)', { b: showAnswer });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hidden of false answer due to role', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      roleType: ['role1']
    };
    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const showAnswer = false;
    const expected = cold('(b|)', { b: showAnswer });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hidden of false answer due to role panel member', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        { memberID: '123', memberType: MemberType.PANEL_MEMBER, requirementType: RequirementType.MUSTINC }
      ]
    };
    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const showAnswer = false;
    const expected = cold('(b|)', { b: showAnswer });
    expect(result$).toBeObservable(expected);
  });
  it('should return false when amendments are enabled (overrides everything)', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingConditions = {
      ...STATE.hearingConditions,
      isHearingAmendmentsEnabled: true
    } as any;
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = null as any;

    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: false });
    expect(result$).toBeObservable(expected);
  });

  it('should return true when panelRequirements is defined but has no relevant fields', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    // object exists but none of panelSpecialisms/roleType/panelPreferences present
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {} as any;

    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: true });
    expect(result$).toBeObservable(expected);
  });

  it('should return true when all arrays are present but empty', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: [],
      roleType: [],
      panelPreferences: []
    } as any;

    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: true });
    expect(result$).toBeObservable(expected);
  });

  it('should return true when panelPreferences has no PANEL_MEMBER entries', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        { memberID: 'A1', memberType: MemberType.JUDGE, requirementType: RequirementType.EXCLUDE },
        { memberID: 'A2', memberType: MemberType.JUDGE, requirementType: RequirementType.MUSTINC }
      ]
    } as any;

    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: true });
    expect(result$).toBeObservable(expected);
  });

  it('should return false when at least one PANEL_MEMBER exists, regardless of requirement type', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        { memberID: 'X1', memberType: MemberType.JUDGE, requirementType: RequirementType.EXCLUDE },
        { memberID: 'X2', memberType: MemberType.PANEL_MEMBER, requirementType: RequirementType.OPTINC }, // counts
        { memberID: 'X3', memberType: MemberType.JUDGE, requirementType: RequirementType.MUSTINC }
      ]
    } as any;

    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: false });
    expect(result$).toBeObservable(expected);
  });

  it('should return true when panelRequirements is undefined', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = undefined as any;

    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: true });
    expect(result$).toBeObservable(expected);
  });
});
