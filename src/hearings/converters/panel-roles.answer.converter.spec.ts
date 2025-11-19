import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { LovRefDataModel } from '../models/lovRefData.model';
import { Mode } from '../models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { PanelRolesAnswerConverter } from './panel-roles.answer.converter';

describe('PanelRolesAnswerConverter', () => {
  let converter: AnswerConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  let router: any;
  const OTHER_PANEL_ROLES: LovRefDataModel[] = [
    {
      category_key: 'PanelMemberType',
      key: 'BBA3-DQPM',
      value_en: 'Disability Qualified Panel Member',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'PanelMemberType',
      key: 'BBA3-MQPM2',
      value_en: 'Medically Qualified Panel Member',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: [
        {
          category_key: 'PanelMemberSpecialism',
          key: 'BBA3-MQPM2-003',
          value_en: 'Eye Surgeon',
          value_cy: '',
          hint_text_en: '',
          hint_text_cy: '',
          lov_order: null,
          parent_category: 'PanelMemberType',
          parent_key: 'BBA3-MQPM2',
          active_flag: 'Y',
          child_nodes: null
        },
        {
          category_key: 'PanelMemberSpecialism',
          key: 'BBA3-MQPM2-004',
          value_en: 'General Practitioner',
          value_cy: '',
          hint_text_en: '',
          hint_text_cy: '',
          lov_order: null,
          parent_category: 'PanelMemberType',
          parent_key: 'BBA3-MQPM2',
          active_flag: 'Y',
          child_nodes: null
        },
        {
          category_key: 'PanelMemberSpecialism',
          key: 'BBA3-MQPM2-001',
          value_en: 'Cardiologist',
          value_cy: '',
          hint_text_en: '',
          hint_text_cy: '',
          lov_order: null,
          parent_category: 'PanelMemberType',
          parent_key: 'BBA3-MQPM2',
          active_flag: 'Y',
          child_nodes: null
        },
        {
          category_key: 'PanelMemberSpecialism',
          key: 'BBA3-MQPM2-002',
          value_en: 'Carer',
          value_cy: '',
          hint_text_en: '',
          hint_text_cy: '',
          lov_order: null,
          parent_category: 'PanelMemberType',
          parent_key: 'BBA3-MQPM2',
          active_flag: 'Y',
          child_nodes: null
        }
      ]
    },
    {
      category_key: 'PanelMemberType',
      key: 'BBA3-MQPM1',
      value_en: 'Medically Qualified Panel Member',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: [
        {
          category_key: 'PanelMemberSpecialism',
          key: 'BBA3-MQPM1-001',
          value_en: 'Cardiologist',
          value_cy: '',
          hint_text_en: '',
          hint_text_cy: '',
          lov_order: null,
          parent_category: 'PanelMemberType',
          parent_key: 'BBA3-MQPM1',
          active_flag: 'Y',
          child_nodes: null
        },
        {
          category_key: 'PanelMemberSpecialism',
          key: 'BBA3-MQPM1-002',
          value_en: 'Carer',
          value_cy: '',
          hint_text_en: '',
          hint_text_cy: '',
          lov_order: null,
          parent_category: 'PanelMemberType',
          parent_key: 'BBA3-MQPM1',
          active_flag: 'Y',
          child_nodes: null
        },
        {
          category_key: 'PanelMemberSpecialism',
          key: 'BBA3-MQPM1-004',
          value_en: 'General Practitioner',
          value_cy: '',
          hint_text_en: '',
          hint_text_cy: '',
          lov_order: null,
          parent_category: 'PanelMemberType',
          parent_key: 'BBA3-MQPM1',
          active_flag: 'Y',
          child_nodes: null
        },
        {
          category_key: 'PanelMemberSpecialism',
          key: 'BBA3-MQPM1-003',
          value_en: 'Eye Surgeon',
          value_cy: '',
          hint_text_en: '',
          hint_text_cy: '',
          lov_order: null,
          parent_category: 'PanelMemberType',
          parent_key: 'BBA3-MQPM1',
          active_flag: 'Y',
          child_nodes: null
        }
      ]
    },
    {
      category_key: 'PanelMemberType',
      key: 'BBA3-FQPM',
      value_en: 'Financially Qualified Panel Member',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'PanelMemberType',
      key: 'BBA3-RMM',
      value_en: 'Regional Medical Member',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                otherPanelRoles: OTHER_PANEL_ROLES
              }
            }
          }
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new PanelRolesAnswerConverter(router);
  });

  it('should transform hearing panel roles (mixed role + specialism)', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: ['BBA3-DQPM', 'BBA3-MQPM2-002'],
      roleType: ['BBA3-DQPM']
    };
    const result$ = converter.transformAnswer(of(STATE));
    const option = 'Disability Qualified Panel Member<br>Medically Qualified Panel Member - Carer';
    const expected = cold('(b|)', { b: option });
    expect(result$).toBeObservable(expected);
  });

  it('should return empty string when there are no selections (panelRequirements is null)', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = null as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: '' });
    expect(result$).toBeObservable(expected);
  });

  it('should render a role with no specialisms when only roleType is selected', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: [],
      roleType: ['BBA3-FQPM']
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: 'Financially Qualified Panel Member' });
    expect(result$).toBeObservable(expected);
  });

  it('should render role inferred from specialism when only specialism is selected', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: ['BBA3-MQPM2-003'],
      roleType: []
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: 'Medically Qualified Panel Member - Eye Surgeon' });
    expect(result$).toBeObservable(expected);
  });

  it('should join multiple specialisms under the same role with a comma', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: ['BBA3-MQPM1-001', 'BBA3-MQPM1-004'],
      roleType: [] // role inferred from parent of specialisms
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: 'Medically Qualified Panel Member - Cardiologist<br>Medically Qualified Panel Member - General Practitioner' });
    expect(result$).toBeObservable(expected);
  });

  it('should ignore unknown keys and return empty when nothing matches ref data', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: ['UNKNOWN-1', 'ALSO-UNKNOWN'],
      roleType: ['NOT-A-ROLE']
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: '' });
    expect(result$).toBeObservable(expected);
  });

  it('should read from hearingRequestToCompare when amendments enabled and mode VIEW_EDIT', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: [],
      roleType: []
    } as any;

    STATE.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: ['BBA3-MQPM2-004'],
      roleType: []
    } as any;

    STATE.hearingConditions = {
      ...STATE.hearingConditions,
      isHearingAmendmentsEnabled: true,
      mode: Mode.VIEW_EDIT
    } as any;

    const result$ = converter.transformAnswer(of(STATE));
    const expected = cold('(b|)', { b: 'Medically Qualified Panel Member - General Practitioner' });
    expect(result$).toBeObservable(expected);
  });
});
