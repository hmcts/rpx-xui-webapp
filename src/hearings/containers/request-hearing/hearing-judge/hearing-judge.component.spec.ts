import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { JudicialUserModel } from '../../../../hearings/models/judicialUser.model';
import { HearingJudgeNamesListComponent } from '../../../components';
import { initialState } from '../../../hearing.test.data';
import { ACTION, HearingJudgeSelectionEnum, MemberType, RadioOptions, RequirementType } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { HearingsService } from '../../../services/hearings.service';
import { HearingJudgeComponent } from './hearing-judge.component';

describe('HearingJudgeComponent', () => {
  let component: HearingJudgeComponent;
  let fixture: ComponentFixture<HearingJudgeComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const childComponent = jasmine.createSpyObj('HearingJudgeNamesListComponent', ['isExcludeJudgeInputValid']);
  const personComponent = jasmine.createSpyObj('HearingJudgeNameComponent', ['setSelectedJudge', 'isJudgeInputValid']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);
  const judgeTypes: LovRefDataModel[] = [
    {
      key: 'tribunalJudge',
      value_en: 'Tribunal Judge',
      value_cy: '',
      hintText_EN: 'Tribunal',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [HearingJudgeComponent, HearingJudgeNamesListComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingJudgeTypes: judgeTypes
              }
            },
            fragment: of('point-to-me'),
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HearingJudgeComponent);
    component = fixture.componentInstance;
    component.hearingJudgeTypes = judgeTypes;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check specificJudge section', () => {
    component.showSpecificJudge(RadioOptions.YES);
    expect(component.specificJudgeSelection).toBe(RadioOptions.YES);
  });

  it('should initForm', () => {
    component.initForm();
    expect(component.hearingJudgeForm.controls.findPersonControl.get('domain')).toBeTruthy();
    expect(component.hearingJudgeForm.controls.findPersonControl.get('email')).toBeTruthy();
    expect(component.hearingJudgeForm.controls.findPersonControl.get('id')).toBeTruthy();
    expect(component.hearingJudgeForm.controls.findPersonControl.get('knownAs')).toBeTruthy();
    expect(component.hearingJudgeForm.controls.findPersonControl.get('name')).toBeTruthy();
    expect(component.hearingJudgeForm.controls.findPersonControl.get('personalCode')).toBeTruthy();
  });

  it('should check form data', () => {
    component.excludedJudge = childComponent;
    component.excludedJudge.validationError = { id: 'elementId', message: 'Error Message' };
    component.checkFormData();
    component.showExcludeJudgeError();
    expect(childComponent.isExcludeJudgeInputValid).toHaveBeenCalled();
    expect(component.validationErrors.length).toBeGreaterThan(0);
  });

  it('should check RadioButton selection', () => {
    component.hearingJudgeForm.get('specificJudge').setValue(null);
    component.showRadioButtonError();
    expect(component.specificJudgeSelectionError).toBe(HearingJudgeSelectionEnum.SelectionError);
    component.hearingJudgeForm.get('specificJudge').setValue(RadioOptions.NO);
    component.showSpecificJudge(RadioOptions.NO);
    component.showRadioButtonError();
    expect(component.selectJudgeTypesError).toBe(HearingJudgeSelectionEnum.SelectOneJudgeError);
  });

  it('should check form valid', () => {
    component.excludedJudge = childComponent;
    component.isFormValid();
    expect(childComponent.isExcludeJudgeInputValid).toHaveBeenCalled();
  });

  it('should check prepareHearingRequestData', () => {
    const judgeInfo = {
      id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
      name: 'Jacky Collins',
      email: 'jacky.collins@judicial.com',
      domain: 'JUDICIAL',
      personalCode: 'P0000001',
      knownAs: 'Jacky Collins',
    };
    component.hearingJudgeForm.controls.specificJudge.setValue(RadioOptions.YES);
    component.prepareHearingRequestData();
    expect(component.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences.length).toBe(1);
    component.hearingJudgeForm.controls.findPersonControl.setValue(judgeInfo);
    component.excludedJudge.judgeList = [judgeInfo];
    component.prepareHearingRequestData();
    expect(component.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences.length).toBeGreaterThan(0);
    component.hearingJudgeForm.controls.specificJudge.setValue(RadioOptions.NO);
    component.hearingJudgeForm.controls.judgeType.setValue([
      {
        key: 'tribunalJudge',
        value_en: 'Tribunal Judge',
        value_cy: '',
        hintText_EN: 'Tribunal',
        hintTextCY: '',
        order: 1,
        parentKey: null,
        selected: true,
      }]);
    component.prepareHearingRequestData();
    expect(component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType.length).toBeGreaterThan(0);

  });

  it('should get getFormData', () => {
    component.hearingRequestMainModel.hearingDetails.panelRequirements = { roleType: ['Tribunal'] };
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences = [{
      memberID: 'P000001',
      memberType: MemberType.JUDGE,
      requirementType: RequirementType.EXCLUDE
    }];
    component.getFormData();
    expect(component.hearingJudgeFormInfo.excludedJudges.length).toBe(1);
    expect(component.specificJudgeSelection).toBe(RadioOptions.NO);
    component.hearingRequestMainModel.hearingDetails.panelRequirements.roleType = null;
    component.hearingRequestMainModel.hearingDetails.panelRequirements.panelPreferences = [{
      memberID: 'P000001',
      memberType: MemberType.JUDGE,
      requirementType: RequirementType.MUSTINC
    }];
    component.getFormData();
    expect(component.specificJudgeSelection).toBe(RadioOptions.YES);
  });

  it('should check setFormData', () => {
    component.hearingJudgeInfo = personComponent;
    component.setFormData();
    expect(component.excludedJudgeList.length).toBe(0);
    expect(personComponent.setSelectedJudge).not.toHaveBeenCalled();
    const personalCodeJudgeList: JudicialUserModel[] = [{
      sidam_id: '1102839232',
      object_id: '1102839232',
      known_as: 'Jacky Collins',
      surname: 'Jacky Collins',
      personal_code: 'P0000001',
      full_name: 'Jacky Collins',
      post_nominals: 'Jacky Collins',
      email_id: 'jacky.collins@judicial.com',
    },
    {
      sidam_id: '1102839233',
      object_id: '1102839233',
      known_as: 'Jammie Williams',
      surname: 'Jammie Williams',
      personal_code: 'P0000002',
      full_name: 'Jammie Williams',
      post_nominals: 'Jammie Williams',
      email_id: 'jammie.williams@judicial.com',
    }];
    component.specificJudgeSelection = RadioOptions.YES;
    component.hearingJudgeFormInfo.includedJudges = ['P0000001'];
    component.hearingJudgeFormInfo.excludedJudges = ['P0000002'];
    component.personalCodejudgeList = personalCodeJudgeList;
    component.setFormData();
    expect(personComponent.setSelectedJudge).toHaveBeenCalled();
    expect(component.excludedJudgeList.length).toBe(1);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
