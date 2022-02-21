import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormArray, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable, of} from 'rxjs';
import {initialState} from '../../hearing.test.data';
import {LovRefDataModel} from '../../models/lovRefData.model';
import {HearingsService} from '../../services/hearings.service';
import {CancelHearingComponent} from './cancel-hearing.component';

describe('CancelHearingComponent', () => {
  let component: CancelHearingComponent;
  let fixture: ComponentFixture<CancelHearingComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  const reasons: LovRefDataModel[] = [
    {
      key: 'reasonone',
      value_en: 'Reason 1',
      value_cy: '',
      hintText_EN: 'Reason 1',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    }];

  const HEARING_ID = 'h00001';
  const CASE_REF = '1111222233334444';
  let mockHearingService: any;
  let mockStore: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [CancelHearingComponent],
      providers: [
        {provide: HearingsService, useValue: hearingsService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingCancelOptions: reasons,
              },
            },
            params: Observable.of({hearingId: HEARING_ID}),
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
    fixture = TestBed.createComponent(CancelHearingComponent);
    component = fixture.componentInstance;
    component.hearingCancelOptions = reasons;
    mockHearingService = TestBed.get(HearingsService);
    spyOn(component, 'initForm').and.callThrough();
    spyOn(component, 'getChosenReasons').and.callThrough();
    spyOn(mockHearingService, 'cancelHearingRequest').and.returnValue(of({}));
    spyOn(component, 'isFormValid').and.callThrough();
    mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
    mockStore.pipe.and.returnValue(of(initialState.hearings.hearingList));
    fixture.detectChanges();
  });

  it('should assign hearingId in component', () => {
    expect(component.hearingId).toEqual(HEARING_ID);
  });

  it('should call methods in oninit', () => {
    expect(component.initForm).toHaveBeenCalled();
    expect(component.hearingCancelOptions.length).toEqual(reasons.length);
    expect(component.getReasonsTypeFormArray.length).toBeGreaterThan(0);
  });

  it('should localise casehearing variables', () => {
    expect(component.caseId).toEqual(CASE_REF);
    expect(component.caseHearing.hearingID).toEqual(initialState.hearings.hearingList.hearingListMainModel.caseHearings[0].hearingID);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call cancelHearingRequest when executeAction is called with a valid form', () => {
    component.executeContinue();
    expect(mockHearingService.cancelHearingRequest).not.toHaveBeenCalled();
  });

  it('should call cancelHearingRequest when executeAction is called with a valid form', () => {
    (component.hearingCancelForm.controls.reasons as FormArray).controls
      .forEach(reason => reason.value.selected = true);
    component.executeContinue();
    expect(mockHearingService.cancelHearingRequest).toHaveBeenCalled();
    expect(component.getChosenReasons).toHaveBeenCalled();
  });

  it('should be true when calling isFormValid reasons selected', () => {
    (component.hearingCancelForm.controls.reasons as FormArray).controls
      .forEach(reason => reason.value.selected = true);
    const formValid = component.isFormValid();
    expect(formValid).toEqual(true);
  });

  it('should be false when calling isFormValid with no reasons selected', () => {
    const formValid = component.isFormValid();
    expect(component.validationErrors.length).toBeGreaterThan(0);
    expect(formValid).toEqual(false);
  });
});
