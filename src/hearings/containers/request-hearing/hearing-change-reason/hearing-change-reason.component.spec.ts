import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormArray, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {of, throwError} from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { ACTION } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { HearingsService } from '../../../services/hearings.service';
import {HearingChangeReasonComponent} from './hearing-change-reason.component';

describe('HearingChangeReasonComponent', () => {
  let component: HearingChangeReasonComponent;
  let fixture: ComponentFixture<HearingChangeReasonComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  const reasons: LovRefDataModel[] = [
    {
      key: 'reasonOne',
      value_en: 'Reason 1',
      value_cy: '',
      hint_text_en: 'Reason 1',
      hint_text_cy: '',
      lov_order: 1,
      category_key: 'HearingChangeReason',
      parent_category: '',
      parent_key: '',
      active_flag: '',
    },
    {
      key: 'reasonTwo',
      value_en: 'Reason 2',
      value_cy: '',
      hint_text_en: 'Reason 2',
      hint_text_cy: '',
      lov_order: 2,
      category_key: 'HearingChangeReason',
      parent_category: '',
      parent_key: '',
      active_flag: '',
    },
    {
      key: 'reasonThree',
      value_en: 'Reason 3',
      value_cy: '',
      hint_text_en: 'Reason 3',
      hint_text_cy: '',
      lov_order: 3,
      category_key: 'HearingChangeReason',
      parent_category: '',
      parent_key: '',
      active_flag: '',
    },
  ];

  let mockStore: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [HearingChangeReasonComponent],
      providers: [
        {provide: HearingsService, useValue: hearingsService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingChangeReason: reasons,
              },
            },
          },
        },
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingChangeReasonComponent);
    component = fixture.componentInstance;
    component.hearingChangeReason = reasons;
    spyOn(component, 'initForm').and.callThrough();
    spyOn(component, 'getChosenReasons').and.callThrough();
    spyOn(component, 'isFormValid').and.callThrough();
    mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
    mockStore.pipe.and.returnValue(of(initialState.hearings.hearingList));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call methods in oninit', () => {
    expect(component.initForm).toHaveBeenCalled();
    expect(component.hearingChangeReason.length).toEqual(reasons.length);
    expect(component.getReasonsTypeFormArray.length).toBeGreaterThan(0);
  });

  it('should be true when calling isFormValid reasons selected', () => {
    (component.hearingChangeReasonForm.controls.reasons as FormArray).controls
      .forEach(reason => reason.value.selected = true);
    const formValid = component.isFormValid(ACTION.CONTINUE);
    expect(formValid).toEqual(true);
  });

  it('should be false when calling isFormValid with no reasons selected',  () => {
    const formValid = component.isFormValid(ACTION.VIEW_EDIT_SUBMIT);
    expect(formValid).toEqual(false);
  });

  it('should not be any validation errors when back button selected', () => {
    component.isFormValid(ACTION.BACK);
    expect(component.errors.length).toEqual(0);
  });

  it('should have a server error message mapped when update request failed', () => {
    hearingsService.updateHearingRequest = jasmine.createSpy().and.returnValue(throwError(''));
    component.navigateAction(ACTION.VIEW_EDIT_SUBMIT);
    expect(component.errors).not.toEqual(null);
  });

});
