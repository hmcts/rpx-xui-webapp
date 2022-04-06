import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { HearingJudgeNamesListComponent } from '../../../components';
import { initialState } from '../../../hearing.test.data';
import { ACTION, MemberType, RadioOptions, RequirementType } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { JudicialUserModel } from '../../../models/person.model';
import { HearingsService } from '../../../services/hearings.service';
import { HearingPanelComponent } from './hearing-panel.component';

describe('HearingPanelComponent', () => {
  let component: HearingPanelComponent;
  let fixture: ComponentFixture<HearingPanelComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const childComponent = jasmine.createSpyObj('HearingJudgeNamesListComponent', ['isExcludeJudgeInputValid']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  const OTHER_PANEL_ROLES: LovRefDataModel[] = [
    {
      key: 'DisabilityQualifiedPanelMember',
      value_en: 'Disability qualified panel member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
    }, {
      key: 'MedicallyQualifiedPanelMember1',
      value_en: 'Medically qualified panel member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
      child_nodes: [{
        key: 'Cardiologist',
        value_en: 'Cardiologist',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      },
      {
        key: 'Carer',
        value_en: 'Carer',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      },
      {
        key: 'EyeSurgeon',
        value_en: 'Medically qualified panel member',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      },
      {
        key: 'GeneralPractitioner',
        value_en: 'General Practitioner',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      }]
    }, {
      key: 'MedicallyQualifiedPanelMember',
      value_en: 'Medically qualified panel member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
      child_nodes: [{
        key: 'Cardiologist',
        value_en: 'Cardiologist',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      },
      {
        key: 'Carer',
        value_en: 'Carer',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      },
      {
        key: 'EyeSurgeon',
        value_en: 'Medically qualified panel member',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      },
      {
        key: 'GeneralPractitioner',
        value_en: 'General Practitioner',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      }]
    }, {
      key: 'FinanciallyQualifiedPanelMember',
      value_en: 'Financially qualified panel member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
      child_nodes: []
    },
    {
      key: 'RegionalMedicalMember',
      value_en: 'Regional Medical Member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
      child_nodes: []
    }];
  const JUDICAIL_USER_DETAILS = [{
    memberID: 'P0000001',
    memberType: MemberType.PANEL_MEMBER,
    requirementType: RequirementType.MUSTINC
  }];

  beforeEach(() => {

    const STATE = _.cloneDeep(initialState);
    STATE.hearings.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelPreferences: JUDICAIL_USER_DETAILS,
      panelSpecialisms: ['DisabilityQualifiedPanelMember', '', 'Cardiologist']
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [HearingPanelComponent, HearingJudgeNamesListComponent],
      providers: [
        provideMockStore({initialState: STATE}),
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                otherPanelRoles: OTHER_PANEL_ROLES,
                judicialUsers: JUDICAIL_USER_DETAILS,
              },
            },
          },
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HearingPanelComponent);
    component = fixture.componentInstance;
    spyOn(component, 'fragmentFocus').and.callFake(() => { });
    spyOn(component, 'prepareData').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check specificPanel selection', () => {
    component.showSpecificPanel(RadioOptions.YES);
    expect(component.panelSelection).toBe(RadioOptions.YES);
  });

  it('should fail the form validation when no panel member/roles are selected', () => {
    component.panelJudgeForm.controls.multiLevelSelect.value.forEach(node => {
      node.selected = false;
    });
    component.includedJudge.judgeList = [];
    component.excludedJudge.judgeList = [];
    component.panelJudgeForm.controls.specificPanel.setValue(RadioOptions.YES);
    component.isFormValid();
    expect(component.validationErrors.length).toBeGreaterThan(0);
  });

  it('should check form valid', () => {
    component.panelJudgeForm.controls.specificPanel.setValue('');
    expect(component.isFormValid()).toBeFalsy();
    component.showSpecificPanel(RadioOptions.YES);
    expect(component.panelSelection).toBe(RadioOptions.YES);
    expect(component.isFormValid()).toBeTruthy();
  });

  it('should check getPannelMemberList', () => {
    component.personalCodejudgeList = [{
      sidam_id: '1102839232',
      object_id: '1102839232',
      known_as: 'Jacky Collins',
      surname: 'Jacky Collins',
      personal_code: 'P0000001',
      full_name: 'Jacky Collins',
      post_nominals: 'Jacky Collins',
      email_id: 'jacky.collins@judicial.com',
    }];
    component.initForm();
    expect(component.includedJudgeList.length).toBe(1);
    expect(component.getPannelMemberList(RequirementType.MUSTINC).length).toBe(1);
    expect(component.panelSelection).toBe(RadioOptions.YES);
    expect(component.getPannelMemberList(RequirementType.EXCLUDE).length).toBe(0);
  });

  it('should check prepareData', () => {
    const judgeInfo: JudicialUserModel = {
      sidam_id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
      object_id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
      known_as: 'Hearing Judge',
      surname: 'Jacky',
      personal_code: 'P100001',
      full_name: 'Jacky Collins',
      post_nominals: '',
      email_id: 'jacky.collins@judicial.com'
    };

    component.includedJudge.judgeList = [judgeInfo];
    component.excludedJudge.judgeList = [judgeInfo];
    component.prepareData();
    expect(component.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences.length).toBe(2);
  });

  it('should prepare data when form is valid', () => {
    component.executeAction(ACTION.CONTINUE);
    expect(component.prepareData).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
