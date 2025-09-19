import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { RequirementType } from 'api/hearings/models/hearings.enum';
import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState, judgeRefData, judicialUsersRefData } from '../hearing.test.data';
import { MemberType, Mode } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { JudgeExclusionAnswerConverter } from './judge-exclusion.answer.converter';

describe('JudgeExclusionAnswerConverter', () => {
  let converter: AnswerConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  let router: any;
  const prefFor = (idx: number) => ({
    memberID: judicialUsersRefData[idx].personalCode,
    memberType: MemberType.JUDGE,
    requirementType: RequirementType.EXCLUDE
  });

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
    converter = new JudgeExclusionAnswerConverter(router);
  });

  it('should transform hearing judge exclusion', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [prefFor(0)]
    };
    const result$ = converter.transformAnswer(of(STATE));

    const option = judicialUsersRefData[0].knownAs;
    const expected = cold('(b|)', { b: option });
    expect(result$).toBeObservable(expected);
  });

  it('should return empty string when there are no panelPreferences', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: []
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: '' });
    expect(result$).toBeObservable(expected);
  });

  it('should return empty string when no EXCLUDE judge preferences are present', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        // Non-judge
        { memberID: 'X0001', memberType: MemberType.PANEL_MEMBER, requirementType: RequirementType.EXCLUDE },
        // Judge but not EXCLUDE
        { memberID: judicialUsersRefData[0].personalCode, memberType: MemberType.JUDGE, requirementType: RequirementType.MUSTINC }
      ]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: '' });
    expect(result$).toBeObservable(expected);
  });

  it('should join multiple excluded judge names with a comma (no spaces)', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [prefFor(0), prefFor(1)]
    };

    const result$ = converter.transformAnswer(of(STATE));
    const expectedJoined = `${judicialUsersRefData[0].fullName},${judicialUsersRefData[1].fullName}`;
    const expected = cold('(b|)', { b: expectedJoined });
    expect(result$).toBeObservable(expected);
  });

  it('should ignore excluded judges that are not found in judicial users list', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        prefFor(0),
        { memberID: 'UNKNOWN_CODE', memberType: MemberType.JUDGE, requirementType: RequirementType.EXCLUDE }
      ]
    };

    const result$ = converter.transformAnswer(of(STATE));
    const expectedName = judicialUsersRefData[0].knownAs;
    const expected = cold('(b|)', { b: expectedName });
    expect(result$).toBeObservable(expected);
  });

  it('should use hearingRequestToCompare when amendments are enabled and mode is VIEW_EDIT', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    // Put something different in the main request to ensure the code path switches to "toCompare"
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: []
    };
    STATE.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [prefFor(0)]
    } as any;

    STATE.hearingConditions = {
      ...STATE.hearingConditions,
      isHearingAmendmentsEnabled: true,
      mode: Mode.VIEW_EDIT
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expectedName = judicialUsersRefData[0].fullName;
    const expected = cold('(b|)', { b: expectedName });
    expect(result$).toBeObservable(expected);
  });
});
