import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ErrorMessage} from '@hmcts/ccd-case-ui-toolkit/dist/shared/domain';
import {provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {initialState} from '../../../hearing.test.data';
import {ACTION} from '../../../models/hearings.enum';
import {LovRefDataModel} from '../../../models/lovRefData.model';
import {HearingsService} from '../../../services/hearings.service';
import {LovRefDataService} from '../../../services/lov-ref-data.service';
import {ValidatorsUtils} from '../../../utils/validators.utils';
import {HearingAttendanceComponent} from './hearing-attendance.component';

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
  const lovRefDataService = new LovRefDataService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HearingAttendanceComponent, MockHearingPartiesComponent],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
        {provide: LovRefDataService, useValue: lovRefDataService},
        {
          provide: ActivatedRoute,
          useValue: {
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
    component.executeAction(ACTION.CONTINUE);
    expect(component.prepareHearingRequestData).toHaveBeenCalled();
  });
  it('should true when calling isFormValid with partyChannel', () => {
    component.attendanceFormGroup.controls.estimation.setValue(1);
    (component.attendanceFormGroup.controls.parties as FormArray).controls.forEach((element: AbstractControl) => {
      element.value.individualDetails.preferredHearingChannel = 'inperson';
    });
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

