import {cold} from 'jasmine-marbles';
import * as _ from 'lodash';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {PanelRolesHiddenConverter} from './panel-roles.hidden.converter';

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
    const expected = cold('(b|)', {b: showAnswer});
    expect(result$).toBeObservable(expected);
  });

  it('should transform hidden of false answer', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: ['cardiologist']
    };
    const result$ = panelRolesHiddenConverter.transformHidden(of(STATE));
    const showAnswer = false;
    const expected = cold('(b|)', {b: showAnswer});
    expect(result$).toBeObservable(expected);
  });


});
