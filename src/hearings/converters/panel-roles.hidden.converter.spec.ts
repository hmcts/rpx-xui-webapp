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
});
