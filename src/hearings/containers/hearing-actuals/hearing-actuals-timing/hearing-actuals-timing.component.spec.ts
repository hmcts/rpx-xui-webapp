import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../../hearing.test.data';
import {HearingsService} from '../../../services/hearings.service';
import {ValidatorsUtils} from '../../../utils/validators.utils';
import {HearingActualsTimingComponent} from './hearing-actuals-timing.component';

describe('HearingTimingComponent', () => {
  const hearingsService = jasmine.createSpyObj('HearingsService', ['updateHearingActuals']);
  let store: Store<any>;
  let component: HearingActualsTimingComponent;
  let fixture: ComponentFixture<HearingActualsTimingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
        ValidatorsUtils
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [HearingActualsTimingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingActualsTimingComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form ', () => {
    expect(component.formGroup.value.hearingStartTime).toBe('09:00');
    expect(component.formGroup.value.hearingEndTime).toBe('10:00');
  });

  it('should submit form ', () => {
    spyOn(store, 'dispatch');
    component.formGroup.patchValue({
      hearingStartTime: '09:00',
      hearingEndTime: '10:00',
      recordTimes: 'no'
    });
    component.onSubmit(component.formGroup.value, component.formGroup.valid);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should set errors enter valid time when the hearingStartTime and hearingEndTime are not valid', () => {
    component.formGroup.patchValue({
      hearingStartTime: '44:00',
      hearingEndTime: '44:00',
      recordTimes: 'no'
    });
    component.onSubmit(component.formGroup.value, component.formGroup.valid);
    expect(component.formGroup.get('hearingStartTime').hasError('invalidTime')).toBeTruthy();
    expect(component.formGroup.get('hearingEndTime').hasError('invalidTime')).toBeTruthy();
  });


  it('should set errors invalid time range if start time is greater than finish time', () => {
    component.formGroup.patchValue({
      hearingStartTime: '10:00',
      hearingEndTime: '09:00',
      recordTimes: 'no'
    });
    component.onSubmit(component.formGroup.value, component.formGroup.valid);
    expect(component.formGroup.hasError('invalidTimeRange')).toBeTruthy();
    expect(component.formGroup.getError('invalidTimeRange').hearingStartTime.message).toBe('Start time must be before finish time');
  });

  it('should set errors enter valid pauseTime and resumeTime when user selects recordTimes', () => {
    component.formGroup.patchValue({
      hearingStartTime: '10:00',
      hearingEndTime: '09:00',
      recordTimes: 'yes',
      pauseStartTime: null,
      pauseEndTime: null
    });
    component.onSubmit(component.formGroup.value, component.formGroup.valid);
    expect(component.formGroup.get('pauseStartTime').hasError('mandatory')).toBeTruthy();
    expect(component.formGroup.get('pauseEndTime').hasError('mandatory')).toBeTruthy();
  });

  it('should set errors enter valid pauseTime and resumeTime should be between hearingStartTime and hearingEndTime', () => {
    component.formGroup.patchValue({
      hearingStartTime: '10:00',
      hearingEndTime: '09:00',
      recordTimes: 'yes',
      pauseStartTime: '11:00',
      pauseEndTime: '12:00'
    });
    component.onSubmit(component.formGroup.value, component.formGroup.valid);
    expect(component.formGroup.hasError('invalidPauseStartTimeRange')).toBeTruthy();
    expect(component.formGroup.hasError('invalidPauseEndTimeRange')).toBeTruthy();
  });
});
