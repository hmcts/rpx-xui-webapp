import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { HearingJudgeNamesListComponent } from '../../../components';
import { initialState } from '../../../hearing.test.data';
import { ACTION, RadioOptions } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [HearingPanelComponent, HearingJudgeNamesListComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                otherPanelRoles: OTHER_PANEL_ROLES,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check specificPanel selection', () => {
    component.showSpecificPanel(RadioOptions.YES);
    expect(component.panelSelection).toBe(RadioOptions.YES);
  });

  it('should check form data', () => {
    component.excludedJudge = childComponent;
    component.excludedJudge.validationError = { id: 'elementId', message: 'Error Message' };
    component.checkFormData();
    expect(component.validationErrors.length).toBeGreaterThan(0);
  });

  it('should check form valid', () => {
    expect(component.isFormValid()).toBeFalsy();
    component.showSpecificPanel(RadioOptions.YES);
    expect(component.panelSelection).toBe(RadioOptions.YES);
    expect(component.isFormValid()).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
