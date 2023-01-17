import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import * as _ from 'lodash';
import {of} from 'rxjs';
import {initialState, panelMembersRefData} from '../hearing.test.data';
import {MemberType, RequirementType} from '../models/hearings.enum';
import {State} from '../store';
import {PanelMembersAnswerConverter} from './panel-members.answer.converter';

describe('PanelMembersAnswerConverter', () => {

  let converter: PanelMembersAnswerConverter;
  let store: Store<any>;
  let router: any;
  const PANEL_MEMBER_DETAILS = [{
    memberID: 'P0000001',
    memberType: MemberType.PANEL_MEMBER,
    requirementType: RequirementType.MUSTINC
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                judicialUsers: panelMembersRefData,
              },
            },
          },
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new PanelMembersAnswerConverter(router);
  });

  it('should transform hearing judge name', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: PANEL_MEMBER_DETAILS
    };
    const result$ = converter.transformAnswer(of(STATE));
    const option = '';
    const expected = cold('(b|)', {b: option});
    expect(result$).toBeObservable(expected);
  });
});
