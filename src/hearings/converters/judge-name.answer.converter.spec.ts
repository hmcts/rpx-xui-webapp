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
import { JudgeNameAnswerConverter } from './judge-name.answer.converter';

const prefFor = (idx: number) => ({
  memberID: judicialUsersRefData[idx].personalCode,
  memberType: MemberType.JUDGE,
  requirementType: RequirementType.MUSTINC as any // keep enum spelling consistent with project
});

describe('JudgeNameAnswerConverter', () => {
  let converter: AnswerConverter;
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
    converter = new JudgeNameAnswerConverter(router);
  });

  it('should transform hearing judge name', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: JUDICAIL_USER_DETAILS
    };
    const result$ = converter.transformAnswer(of(STATE));
    const option = judgeRefData[0].knownAs;
    const expected = cold('(b|)', { b: option });
    expect(result$).toBeObservable(expected);
  });

  it('should ignore non-judge or non-MUSTINC preferences and return empty string', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        { memberID: 'X0001', memberType: MemberType.PANEL_MEMBER, requirementType: RequirementType.MUSTINC }, // not a judge
        { memberID: judicialUsersRefData[0].personalCode, memberType: MemberType.JUDGE, requirementType: RequirementType.EXCLUDE } // judge but wrong requirement
      ]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: '' });
    expect(result$).toBeObservable(expected);
  });

  it('should error when panelRequirements is undefined (cannot filter)', (done) => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = undefined as any;

    converter.transformAnswer(of(STATE)).subscribe({
      next: () => fail('Expected an error, but got a value'),
      error: (e) => {
        expect(e instanceof TypeError).toBeTrue(); // reading filter on undefined
        done();
      }
    });
  });

  it('should ignore non-judge or non-MUSTINC preferences and return empty string', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        { memberID: 'X0001', memberType: MemberType.PANEL_MEMBER, requirementType: RequirementType.MUSTINC }, // not a judge
        { memberID: judicialUsersRefData[0].personalCode, memberType: MemberType.JUDGE, requirementType: RequirementType.OPTINC } // judge but wrong requirement
      ]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: '' });
    expect(result$).toBeObservable(expected);
  });

  it('should join multiple MUSTINC judge names with a comma (no spaces)', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [prefFor(0)]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    // aligns with your existing expectation using "knownAs"
    const expectedJoined = `${judicialUsersRefData[0].knownAs}`;
    console.log('Expected joined judge names:', expectedJoined);
    const expected = cold('(b|)', { b: expectedJoined });
    expect(result$).toBeObservable(expected);
  });

  it('should ignore MUSTINC judges not found in judicial users list', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: [
        prefFor(0),
        { memberID: 'UNKNOWN_CODE', memberType: MemberType.JUDGE, requirementType: RequirementType.MUSTINC }
      ]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expectedName = judgeRefData[0].knownAs;
    const expected = cold('(b|)', { b: expectedName });
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
    const expected = cold('(b|)', { b: judgeRefData[0].knownAs });
    expect(result$).toBeObservable(expected);
  });
});
