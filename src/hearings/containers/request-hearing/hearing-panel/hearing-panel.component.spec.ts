import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {HearingJudgeNamesListComponent} from '../../../components';
import {initialState} from '../../../hearing.store.state.test';
import {ACTION, RadioOptions} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import {HearingPanelComponent} from './hearing-panel.component';

describe('HearingPanelComponent', () => {
  let component: HearingPanelComponent;
  let fixture: ComponentFixture<HearingPanelComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const childComponent = jasmine.createSpyObj('HearingJudgeNamesListComponent', ['isExcludeJudgeInputValid']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [HearingPanelComponent, HearingJudgeNamesListComponent],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HearingPanelComponent);
    component = fixture.componentInstance;
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
    component.excludedJudge.validationError = {id: 'elementId', message: 'Error Message'};
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
