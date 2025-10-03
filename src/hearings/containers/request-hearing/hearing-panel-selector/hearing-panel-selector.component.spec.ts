import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { MockRpxTranslatePipe } from '../../../../app/shared/test/mock-rpx-translate.pipe';
import { HearingJudgeNamesListComponent } from '../../../components';
import { initialState } from '../../../hearing.test.data';
import { ACTION, MemberType, RequirementType } from '../../../models/hearings.enum';
import { JudicialUserModel } from '../../../models/judicialUser.model';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { HearingsService } from '../../../services/hearings.service';
import { HearingPanelSelectorComponent } from './hearing-panel-selector.component';

describe('HearingPanelSelectorComponent', () => {
  let component: HearingPanelSelectorComponent;
  let fixture: ComponentFixture<HearingPanelSelectorComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

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
  const JUDICAIL_USER_DETAILS = [{
    memberID: 'P0000001',
    memberType: MemberType.PANEL_MEMBER,
    requirementType: RequirementType.MUSTINC
  }];

  beforeEach(() => {
    const STATE = _.cloneDeep(initialState);
    STATE.hearings.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: JUDICAIL_USER_DETAILS,
      panelSpecialisms: ['BBA3-DQPM', 'BBA3-MQPM2-001', 'BBA3-MQPM1-001'],
      roleType: ['BBA3-RMM', 'BBA3-DQPM', 'BBA3-MQPM1']
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [HearingPanelSelectorComponent, HearingJudgeNamesListComponent, MockRpxTranslatePipe],
      providers: [
        provideMockStore({ initialState: STATE }),
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                otherPanelRoles: OTHER_PANEL_ROLES,
                judicialUsers: JUDICAIL_USER_DETAILS
              }
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingPanelSelectorComponent);
    component = fixture.componentInstance;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    spyOn(component, 'fragmentFocus').and.callFake(() => { });
    spyOn(component, 'prepareData').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail the form validation when no panel member/roles are selected', () => {
    component.panelListCollection = [];
    component.includedJudge.judgeList = [];
    component.excludedJudge.judgeList = [];
    component.isFormValid();
    expect(component.validationErrors.length).toBeGreaterThan(0);
  });

  it('should check form valid', () => {
    expect(component.isFormValid()).toBeTruthy();
  });

  it('should check getPanelMemberList', () => {
    component.personalCodejudgeList = [{
      title: 'Mr',
      knownAs: 'Hearing Judge',
      surname: 'Jacky Collins',
      fullName: 'Jacky Collins',
      emailId: 'jacky.collins@judicial.com',
      idamId: '1102839232',
      initials: 'JC',
      postNominals: 'JP',
      personalCode: 'P0000001',
      isJudge: '',
      isMagistrate: '',
      isPanelMember: ''
    }];
    component.initForm();
    expect(component.includedJudgeList.length).toBe(1);
    expect(component.getPanelMemberList(RequirementType.MUSTINC).length).toBe(1);
    expect(component.getPanelMemberList(RequirementType.EXCLUDE).length).toBe(0);
  });

  it('should check prepareData', () => {
    const judgeInfo: JudicialUserModel = {
      title: 'Mr',
      knownAs: 'Hearing Judge',
      surname: 'Jacky',
      fullName: 'Jacky Collins',
      emailId: 'jacky.collins@judicial.com',
      idamId: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
      initials: 'JC',
      postNominals: 'JP',
      personalCode: 'P0000001',
      isJudge: '',
      isMagistrate: '',
      isPanelMember: ''
    };

    component.includedJudge.judgeList = [judgeInfo];
    component.excludedJudge.judgeList = [judgeInfo];
    component.prepareData();
    expect(component.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences.length).toBe(2);
  });

  it('Should populate panelListCollection', () => {
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = ['BBA3-MQPM2'];
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms = ['BBA3-MQPM2-003'];

    const expectedResult = [
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
          }
        ]
      }
    ];
    const result = component.buildModelFromValues();

    expect(result).toEqual(expectedResult);
  });

  it('buildModelFromValues returns [] when roleType is empty', () => {
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = [];
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms = ['BBA3-MQPM2-003'];
    const result = component.buildModelFromValues();
    expect(result).toEqual([]);
  });

  it('skips unknown roleType ids', () => {
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = ['UNKNOWN'];
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms = ['BBA3-MQPM2-003'];
    const result = component.buildModelFromValues();
    expect(result).toEqual([]);
  });

  it('includes a role with null child_nodes when parent has no children', () => {
    // OTHER_PANEL_ROLES includes BBA3-DQPM with child_nodes: null
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = ['BBA3-DQPM'];
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms = ['BBA3-MQPM2-003']; // irrelevant
    const result = component.buildModelFromValues();

    expect(result.length).toBe(1);
    expect(result[0].key).toBe('BBA3-DQPM');
    expect(result[0].child_nodes).toBeNull();
  });

  it('assigns specialisms FIFO when the same roleType appears multiple times', () => {
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = ['BBA3-MQPM2', 'BBA3-MQPM2'];
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms = ['BBA3-MQPM2-003', 'BBA3-MQPM2-004'];

    const result = component.buildModelFromValues();

    expect(result.length).toBe(2);
    expect(result[0].key).toBe('BBA3-MQPM2');
    expect(result[1].key).toBe('BBA3-MQPM2');
    expect(result[0].child_nodes?.[0].key).toBe('BBA3-MQPM2-003');
    expect(result[1].child_nodes?.[0].key).toBe('BBA3-MQPM2-004');
  });

  it('assigns null child_nodes when specialisms run out for repeated roles', () => {
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = ['BBA3-MQPM2', 'BBA3-MQPM2'];
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms = ['BBA3-MQPM2-003'];

    const result = component.buildModelFromValues();

    expect(result.length).toBe(2);
    expect(result[0].child_nodes?.[0].key).toBe('BBA3-MQPM2-003');
    expect(result[1].child_nodes).toBeNull();
  });

  it('matches the earliest suitable specialism for each parent when roles are mixed', () => {
    // Note: specialisms are intentionally out of order to prove the "earliest matching" search.
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = ['BBA3-MQPM2', 'BBA3-MQPM1'];
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms = ['BBA3-MQPM1-003', 'BBA3-MQPM2-001'];

    const result = component.buildModelFromValues();

    expect(result.length).toBe(2);
    expect(result[0].key).toBe('BBA3-MQPM2');
    expect(result[0].child_nodes?.[0].key).toBe('BBA3-MQPM2-001');
    expect(result[1].key).toBe('BBA3-MQPM1');
    expect(result[1].child_nodes?.[0].key).toBe('BBA3-MQPM1-003');
  });

  it('only assigns one specialism per role occurrence even if multiple exist', () => {
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = ['BBA3-MQPM2'];
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms = ['BBA3-MQPM2-003', 'BBA3-MQPM2-004'];

    const result = component.buildModelFromValues();

    expect(result.length).toBe(1);
    expect(result[0].key).toBe('BBA3-MQPM2');
    expect(result[0].child_nodes?.length).toBe(1);
    expect(result[0].child_nodes?.[0].key).toBe('BBA3-MQPM2-003'); // the earliest matching specialism only
  });

  it('preserves the order of roleType in the output', () => {
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = ['BBA3-RMM', 'BBA3-MQPM2'];
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms = ['BBA3-MQPM2-001'];

    const result = component.buildModelFromValues();

    expect(result.map((n) => n.key)).toEqual(['BBA3-RMM', 'BBA3-MQPM2']);
    expect(result[0].child_nodes).toBeNull(); // RMM has no children
    expect(result[1].child_nodes?.[0].key).toBe('BBA3-MQPM2-001');
  });

  it('ignores specialisms that do not belong to any selected parent role', () => {
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = ['BBA3-FQPM'];
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms = ['BBA3-MQPM2-001'];

    const result = component.buildModelFromValues();

    expect(result.length).toBe(1);
    expect(result[0].key).toBe('BBA3-FQPM');
    expect(result[0].child_nodes).toBeNull();
  });

  it('does not mistakenly treat role-like strings in panelSpecialisms as matches', () => {
    // Some initial state had a role key inside panelSpecialisms; ensure it does not attach as a child.
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = ['BBA3-DQPM'];
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms = ['BBA3-DQPM'];

    const result = component.buildModelFromValues();

    expect(result.length).toBe(1);
    expect(result[0].key).toBe('BBA3-DQPM');
    expect(result[0].child_nodes).toBeNull();
  });

  it('Should convert model into roleType and panelSpecialisms', () => {
    const modelData = [
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
          }
        ]
      }
    ];

    const { roleType, panelSpecialisms } = component.extractValuesFromModel(modelData);

    expect(roleType).toEqual(['BBA3-MQPM2']);
    expect(panelSpecialisms).toEqual(['BBA3-MQPM2-003']);
  });

  it('should update model when onchange is triggered', () => {
    component.panelListCollection = [];

    const modelData = [
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
          }
        ]
      }
    ];

    component.onModelChange(modelData);

    expect(component.panelListCollection).toEqual(modelData);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
