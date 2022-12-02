import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { PanelDetailsExclusionHiddenConverter } from './panel-details-exclusion.hidden.converter';

describe('PanelDetailsExclusionHiddenConverter', () => {

  let panelDetailsExclusionHiddenConverter: PanelDetailsExclusionHiddenConverter;
  const JUDICAIL_USER_DETAILS = [{
    memberID: 'P0000001',
    memberType: MemberType.PANEL_MEMBER,
    requirementType: RequirementType.EXCLUDE
  }];

  beforeEach(() => {
    panelDetailsExclusionHiddenConverter = new PanelDetailsExclusionHiddenConverter();
  });


  it('should transform hidden of true answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingValues.serviceHearingValuesModel.screenFlow = null;
    const result$ = panelDetailsExclusionHiddenConverter.transformHidden(of(STATE));
    const showWelshPage = true;
    const expected = cold('(b|)', {b: showWelshPage});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hidden of false answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    const result$ = panelDetailsExclusionHiddenConverter.transformHidden(of(STATE));
    const showWelshPage = false;
    const expected = cold('(b|)', {b: showWelshPage});
    expect(result$).toBeObservable(expected);
  });
});
