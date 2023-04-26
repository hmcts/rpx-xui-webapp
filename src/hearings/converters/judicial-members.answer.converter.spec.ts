import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState, judicialUsersRefData } from '../hearing.test.data';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { State } from '../store';
import { JudicialMembersAnswerConverter } from './judicial-members.answer.converter';

describe('JudicialMembersAnswerConverter', () => {
  let converter: JudicialMembersAnswerConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  let router: any;
  const JUDICAIL_USER_DETAILS = [{
    memberID: 'P0000001',
    memberType: MemberType.JUDGE,
    requirementType: RequirementType.MUSTINC
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                judicialUsers: judicialUsersRefData
              }
            }
          }
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new JudicialMembersAnswerConverter(router);
  });

  it('should transform hearing judge name', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: JUDICAIL_USER_DETAILS
    };
    const result$ = converter.transformAnswer(of(STATE), 0);
    const option = '';
    const expected = cold('(b|)', { b: option });
    expect(result$).toBeObservable(expected);
  });
});
