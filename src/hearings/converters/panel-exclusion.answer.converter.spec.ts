import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {RequirementType} from 'api/hearings/models/hearings.enum';
import {cold} from 'jasmine-marbles';
import * as _ from 'lodash';
import {of} from 'rxjs';
import {initialState, judgeRefData, judicailUsersRefData} from '../hearing.test.data';
import {MemberType} from '../models/hearings.enum';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';
import {PanelExclusionAnswerConverter} from './panel-exclusion.answer.converter';

describe('PanelExclusionAnswerConverter', () => {

  let converter: AnswerConverter;
  let store: Store<any>;
  let router: any;
  const JUDICAIL_USER_DETAILS = [{
    memberID: 'P0000001',
    memberType: MemberType.PANEL_MEMBER,
    requirementType: RequirementType.EXCLUDE
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
                judicialUsers: judicailUsersRefData,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new PanelExclusionAnswerConverter(router);
  });

  it('should transform hearing panel exclusion', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: JUDICAIL_USER_DETAILS
    };
    const result$ = converter.transformAnswer(of(STATE));
    const option = judgeRefData[0].knownAs;
    const expected = cold('(b|)', {b: option});
    expect(result$).toBeObservable(expected);
  });
});
