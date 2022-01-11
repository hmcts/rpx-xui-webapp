import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { HearingJudgeNamesListComponent } from '../../../../hearings/components';
import { RefDataModel } from '../../../../hearings/models/refData.model';
import { ACTION, HearingJudgeSelectionEnum, RadioOptions } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import { HearingJudgeComponent } from './hearing-judge.component';

describe('HearingJudgeComponent', () => {
  let component: HearingJudgeComponent;
  let fixture: ComponentFixture<HearingJudgeComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const childComponent = jasmine.createSpyObj('HearingJudgeNamesListComponent', ['isExcludeJudgeInputValid']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);
  const judgeTypes: RefDataModel[] = [
    {
      key: 'tribunalJudge',
      value_en: 'Tribunal Judge',
      value_cy: '',
      hintText_EN: 'Tribunal',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    }];

  const initialState = {
    hearings: {
      hearingList: {
        caseHearingMainModel: [
          {
            hmctsServiceID: 'SSCS'
          }
        ]
      },
      hearingValues: null,
      hearingRequest: null,
      hearingConditions: null,
    }
  };

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

  it('should check specificJudge seection', () => {
    component.showSpecificJudge(RadioOptions.YES);
    expect(component.specificJudgeSelection).toBe(RadioOptions.YES);
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

  afterEach(() => {
    fixture.destroy();
  });
});
