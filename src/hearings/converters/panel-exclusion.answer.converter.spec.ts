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
import { PanelExclusionAnswerConverter } from './panel-exclusion.answer.converter';

describe('PanelExclusionAnswerConverter', () => {
  let converter: AnswerConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  let router: any;

  const prefFor = (idx: number) => ({
    memberID: judicialUsersRefData[idx].personalCode,
    memberType: MemberType.PANEL_MEMBER,
    requirementType: RequirementType.EXCLUDE
  });

  const JUDICAIL_USER_DETAILS = [prefFor(0)];

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
    converter = new PanelExclusionAnswerConverter(router);
  });

  it('should transform hearing panel exclusion', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: JUDICAIL_USER_DETAILS
    };
    const result$ = converter.transformAnswer(of(STATE));
    const option = judicialUsersRefData[0].knownAs;
    console.log('option', option);
    const expected = cold('(b|)', { b: option });
    expect(result$).toBeObservable(expected);
  });

  it('should join multiple excluded panel member names with a comma (no spaces)', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [prefFor(0), prefFor(1)]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expectedJoined = `${judicialUsersRefData[0].fullName},${judicialUsersRefData[1].fullName}`;
    const expected = cold('(b|)', { b: expectedJoined });
    expect(result$).toBeObservable(expected);
  });

  it('should ignore excluded panel members that are not found in judicial users list', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        prefFor(0),
        { memberID: 'UNKNOWN_CODE', memberType: MemberType.PANEL_MEMBER, requirementType: RequirementType.EXCLUDE }
      ]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expectedName = judicialUsersRefData[0].knownAs;
    const expected = cold('(b|)', { b: expectedName });
    expect(result$).toBeObservable(expected);
  });

  it('should return empty string when no PANEL_MEMBER/EXCLUDE entries are present', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);

    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        { memberID: judicialUsersRefData[0].personalCode, memberType: MemberType.JUDGE, requirementType: RequirementType.EXCLUDE },
        { memberID: judicialUsersRefData[1].personalCode, memberType: MemberType.PANEL_MEMBER, requirementType: RequirementType.MUSTINC as any }
      ]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: '' });
    expect(result$).toBeObservable(expected);
  });

  it('should use hearingRequestToCompare when amendments are enabled and mode is VIEW_EDIT', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);

    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: []
    } as any;

    STATE.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [prefFor(0)]
    } as any;

    STATE.hearingConditions = {
      ...STATE.hearingConditions,
      isHearingAmendmentsEnabled: true,
      mode: Mode.VIEW_EDIT
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: judicialUsersRefData[0].knownAs });
    expect(result$).toBeObservable(expected);
  });
});
