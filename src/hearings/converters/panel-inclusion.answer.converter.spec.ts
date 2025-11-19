import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState, judgeRefData, judicialUsersRefData } from '../hearing.test.data';
import { MemberType, Mode, RequirementType } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { PanelInclusionAnswerConverter } from './panel-inclusion.answer.converter';

describe('PanelInclusionAnswerConverter', () => {
  let converter: AnswerConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  let router: any;
  const JUDICAIL_USER_DETAILS = [{
    memberID: 'P0000001',
    memberType: MemberType.PANEL_MEMBER,
    requirementType: RequirementType.MUSTINC
  }];

  const prefFor = (idx: number) => ({
    memberID: judicialUsersRefData[idx].personalCode,
    memberType: MemberType.PANEL_MEMBER,
    requirementType: RequirementType.MUSTINC
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
    converter = new PanelInclusionAnswerConverter(router);
  });

  it('should transform hearing panel inclusion', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: JUDICAIL_USER_DETAILS
    };
    const result$ = converter.transformAnswer(of(STATE));
    const option = judicialUsersRefData[0].knownAs;
    const expected = cold('(b|)', { b: option });
    expect(result$).toBeObservable(expected);
  });
  it('should join multiple included panel member names with a comma (no spaces)', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [prefFor(0), prefFor(1)]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expectedJoined = `${judicialUsersRefData[0].fullName},${judicialUsersRefData[1].fullName}`;
    const expected = cold('(b|)', { b: expectedJoined });
    expect(result$).toBeObservable(expected);
  });

  it('should ignore included panel members not found in judicial users list', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        prefFor(0),
        { memberID: 'UNKNOWN_CODE', memberType: MemberType.PANEL_MEMBER, requirementType: RequirementType.MUSTINC }
      ]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expectedName = judicialUsersRefData[0].knownAs;
    const expected = cold('(b|)', { b: expectedName });
    expect(result$).toBeObservable(expected);
  });

  it('should return empty string when no PANEL_MEMBER/MUSTINC entries are present', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        // Not a panel member
        { memberID: judicialUsersRefData[0].personalCode, memberType: MemberType.JUDGE, requirementType: RequirementType.MUSTINC },
        // Panel member but wrong requirement type
        { memberID: judicialUsersRefData[1].personalCode, memberType: MemberType.PANEL_MEMBER, requirementType: RequirementType.OPTINC }
      ]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: '' });
    expect(result$).toBeObservable(expected);
  });

  it('should return empty string when panelPreferences is an empty array', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: []
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
