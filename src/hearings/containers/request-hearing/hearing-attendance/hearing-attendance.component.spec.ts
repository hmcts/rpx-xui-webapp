import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessage } from '@hmcts/ccd-case-ui-toolkit';
import { provideMockStore } from '@ngrx/store/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { LovRefDataModel } from '../../../../hearings/models/lovRefData.model';
import { initialState } from '../../../hearing.test.data';
import { ACTION, HearingChannelEnum, RadioOptions } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import { LovRefDataService } from '../../../services/lov-ref-data.service';
import { ValidatorsUtils } from '../../../utils/validators.utils';
import { HearingAttendanceComponent } from './hearing-attendance.component';

const refData: LovRefDataModel[] = [
  {
    key: 'INTER',
    value_en: 'In Person',
    value_cy: '',
    hint_text_en: 'In Person',
    hint_text_cy: '',
    lov_order: 1,
    parent_key: null,
    category_key: 'inPerson',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default',
  },
  {
    key: 'TEL',
    value_en: 'Telephone',
    value_cy: '',
    hint_text_en: 'Telephone',
    hint_text_cy: '',
    lov_order: 2,
    parent_key: null,
    category_key: 'Telephone',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default',
    selected: true,
  }
];

@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

describe('HearingAttendanceComponent', () => {
  let component: HearingAttendanceComponent;
  let fixture: ComponentFixture<HearingAttendanceComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  const lovRefDataService = jasmine.createSpyObj('lovRefDataService', ['getListOfValues']);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HearingAttendanceComponent, MockHearingPartiesComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        { provide: LovRefDataService, useValue: lovRefDataService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingChannels: refData
              }
            },
            fragment: of('point-to-me'),
          },
        },
        ValidatorsUtils,
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingAttendanceComponent);
    component = fixture.componentInstance;
    spyOn(component, 'initialiseFromHearingValues').and.callThrough();
    spyOn(component, 'prepareHearingRequestData').and.callThrough();
    spyOn(component, 'isFormValid').and.callThrough();
    lovRefDataService.getListOfValues.and.returnValue(of([]));
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call prepareHearingRequestData when executeAction is called with a valid form', () => {
    component.attendanceFormGroup.controls.estimation.setValue(1);
    (component.attendanceFormGroup.controls.parties as FormArray).controls.forEach(element => {
      element.value.individualDetails.preferredHearingChannel = 'inperson';
    });
    (component.attendanceFormGroup.controls.hearingLevelChannels as FormArray).controls
      .forEach((element: AbstractControl) => element.value.selected = true);
    component.executeAction(ACTION.CONTINUE);
    expect(component.prepareHearingRequestData).toHaveBeenCalled();
  });

  it('should NOT call prepareHearingRequestData when executeAction is called as form is invalid', () => {
    component.attendanceFormGroup.controls.estimation.setValue('10 days');
    component.attendanceFormGroup.controls.hearingLevelChannels.setErrors({ incoreect: true});
    component.executeAction(ACTION.CONTINUE);
    expect(component.prepareHearingRequestData).not.toHaveBeenCalled();
  });

  it('should update hearingRequestMainModel when executeAction and forms paperHearing is YES', () => {
    component.attendanceFormGroup.controls.paperHearing.setValue('Yes');
    component.executeAction(ACTION.CONTINUE);
    expect(component.hearingRequestMainModel.hearingDetails.hearingChannels).toEqual([HearingChannelEnum.ONPPR]);
  });

  it('should NOT call prepareHearingRequestData when executeAction action is BACK', () => {
    component.executeAction(ACTION.BACK);
    expect(component.prepareHearingRequestData).not.toHaveBeenCalled();
  });

  describe('The forms paperHearing', () => {
    it('should equal No as hearingChannels has NOT got ONPPRS', () => {
      fixture.detectChanges();
      expect(component.attendanceFormGroup.controls.paperHearing.value).toEqual('No');
    });
  });

  describe('The forms estimation', () => {
    it('should equal 3 as partyDetails is details', () => {
      fixture.detectChanges();
      expect(component.attendanceFormGroup.controls.estimation.value).toEqual(3);
    });
  });

  it('should return true when calling isFormValid for paper hearings', () => {
    component.attendanceFormGroup.controls.paperHearing.setValue(RadioOptions.YES);
    fixture.detectChanges();
    expect(component.isFormValid()).toEqual(true);
  });
  it('should true when calling isFormValid with partyChannel', () => {
    component.attendanceFormGroup.controls.estimation.setValue(1);
    (component.attendanceFormGroup.controls.parties as FormArray).controls.forEach((element: AbstractControl) => {
      element.value.individualDetails.preferredHearingChannel = 'inperson';
    });
    (component.attendanceFormGroup.controls.hearingLevelChannels as FormArray).controls
      .forEach((element: AbstractControl) => element.value.selected = true);
    const formValid = component.isFormValid();
    expect((component.attendanceFormGroup.controls.parties as FormArray).length).toBeGreaterThan(0);
    expect(formValid).toEqual(true);
  });
  it('should false when calling isFormValid without partyChannel', () => {
    component.attendanceFormGroup.controls.estimation.setValue(1);
    (component.attendanceFormGroup.controls.parties as FormArray).controls.forEach(element => {
      (element as FormGroup).controls.individualDetails.get('preferredHearingChannel').setValue(null);
    });
    const formValid = component.isFormValid();
    expect((component.attendanceFormGroup.controls.parties as FormArray).length).toBeGreaterThan(0);
    expect(formValid).toEqual(false);
  });
  it('should render parties from the hearingvaluemodel', () => {
    const store = jasmine.createSpyObj('store', ['pipe', 'dispatch', 'select']);
    store.select.and.returnValue(of(initialState));
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.initialiseFromHearingValues();
    expect(component.initialiseFromHearingValues).toHaveBeenCalled();
    expect((component.attendanceFormGroup.controls.parties as FormArray).length).toBeGreaterThan(0);
  });

  afterEach(() => {
    fixture.destroy();
  });
});

describe('HearingAttendanceComponent', () => {
  let component: HearingAttendanceComponent;
  let fixture: ComponentFixture<HearingAttendanceComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  const lovRefDataService = jasmine.createSpyObj('lovRefDataService', ['getListOfValues']);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  const updatedInitialState =  _.cloneDeep(initialState);

  updatedInitialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails.hearingChannels = ['byPhone', HearingChannelEnum.ONPPR];
  updatedInitialState.hearings.hearingRequest.hearingRequestMainModel.partyDetails = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HearingAttendanceComponent, MockHearingPartiesComponent],
      providers: [
        provideMockStore({ initialState: updatedInitialState }),
        { provide: HearingsService, useValue: hearingsService },
        { provide: LovRefDataService, useValue: lovRefDataService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingChannels: refData
              }
            },
            fragment: of('point-to-me'),
          },
        },
        ValidatorsUtils,
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingAttendanceComponent);
    component = fixture.componentInstance;
    lovRefDataService.getListOfValues.and.returnValue(of([]));
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('The forms paperHearing', () => {
    it('should equal Yes as hearingChannels has ONPPRS', () => {
      fixture.detectChanges();
      expect(component.attendanceFormGroup.controls.paperHearing.value).toEqual('Yes');
    });
  });

  describe('The forms estimation', () => {
    it('should equal 2 as partyDetails is empty', () => {
      fixture.detectChanges();
      expect(component.attendanceFormGroup.controls.estimation.value).toEqual(2);
    });
  });
  afterEach(() => {
    fixture.destroy();
  });
});
