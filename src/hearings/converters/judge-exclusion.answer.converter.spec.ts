import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { RequirementType } from 'api/hearings/models/hearings.enum';
import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState, judgeRefData, judicailUsersRefData } from '../hearing.test.data';
import { MemberType } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { JudgeExclusionAnswerConverter } from './judge-exclusion.answer.converter';

describe('JudgeExclusionAnswerConverter', () => {

  let converter: AnswerConverter;
  let store: Store<any>;
  let router: any;
  const JUDICAIL_USER_DETAILS = [{
    memberID: 'P0000001',
    memberType: MemberType.JUDGE,
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
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new JudgeExclusionAnswerConverter(router);
  });

  it('should transform hearing judge exclusion', () => {
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
