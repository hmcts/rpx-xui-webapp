import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { hearingStageRefData, initialState } from '../hearing.test.data';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { JudgeTypesAnswerConverter } from './judge-types.answer.converter';
import { Mode } from '../models/hearings.enum';

const keyAt = (i: number) => (hearingStageRefData[i] && hearingStageRefData[i].key) as string;
const valAt = (i: number) => (hearingStageRefData[i] && hearingStageRefData[i].value_en) as string;

describe('JudgeTypesAnswerConverter', () => {
  let converter: AnswerConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  let router: any;
  const ROLE_TYPE = ['initial'];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                judgeTypes: hearingStageRefData
              }
            }
          }
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new JudgeTypesAnswerConverter(router);
  });

  it('should transform hearing judge types', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      roleType: ROLE_TYPE
    };
    const result$ = converter.transformAnswer(of(STATE));
    const option = 'Initial';
    const expected = cold('(b|)', { b: option });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing judge types empty', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = null;
    const result$ = converter.transformAnswer(of(STATE));
    const option = '';
    const expected = cold('(b|)', { b: option });
    expect(result$).toBeObservable(expected);
  });
  it('should join multiple judge types in the order defined by judgeTypes ref data', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    const k0 = keyAt(0);
    const k1 = keyAt(1);
    expect(k0).toBeTruthy();
    expect(k1).toBeTruthy();

    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      roleType: [k0, k1]
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expectedText = `${valAt(0)}, ${valAt(1)}`;
    const expected = cold('(b|)', { b: expectedText });
    expect(result$).toBeObservable(expected);
  });

  it('should ignore unknown roleType keys and return empty when none match', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      roleType: ['totally-unknown-key', 'another-unknown']
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: '' });
    expect(result$).toBeObservable(expected);
  });

  it('should return empty string when roleType is an empty array', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      roleType: []
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: '' });
    expect(result$).toBeObservable(expected);
  });

  it('should return empty string when panelRequirements is undefined', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = undefined as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: '' });
    expect(result$).toBeObservable(expected);
  });

  it('should read from hearingRequestToCompare when amendments are enabled and mode is VIEW_EDIT', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    // ensure main request would yield empty to verify we actually switch to toCompare
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = { roleType: [] } as any;

    const k1 = keyAt(1);
    expect(k1).toBeTruthy();
    STATE.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements = {
      roleType: [k1]
    } as any;

    STATE.hearingConditions = {
      ...STATE.hearingConditions,
      isHearingAmendmentsEnabled: true,
      mode: Mode.VIEW_EDIT
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: valAt(1) });
    expect(result$).toBeObservable(expected);
  });
});
