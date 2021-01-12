import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AlertService, CaseUIToolkitModule,
  ErrorNotifierService, HttpError, NavigationOrigin
} from '@hmcts/ccd-case-ui-toolkit';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store';
import { InfoMessage } from 'src/work-allocation/enums';
import { CaseDetailsHomeComponent } from '..';
import * as fromFeature from '../../store';

describe('CaseDetailsHomeComponent', () => {
  let component: CaseDetailsHomeComponent;
  let fixture: ComponentFixture<CaseDetailsHomeComponent>;
  const mockAlertService = jasmine.createSpyObj('alertService', ['success', 'setPreserveAlerts', 'error']);
  const mockErrorNotifierService = jasmine.createSpyObj('ErrorNotifierService', ['announceError']);
  let store: Store<fromFeature.State>;
  let storeDispatchMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        StoreModule.forRoot({...reducers, cases: combineReducers(fromFeature.reducers)}),
      ],
      declarations: [CaseDetailsHomeComponent],
      providers: [
        { provide: AlertService, useValue: mockAlertService },
        { provide: ErrorNotifierService, useValue: mockErrorNotifierService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    store = TestBed.get(Store);
    storeDispatchMock = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(CaseDetailsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should allow a success message to be shown if sent from assign and go (available-tasks)', () => {
    spyOnProperty(mockRouter, 'getCurrentNavigation').and.returnValue({extras: { state: { showMessage: true, messageText: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS}}});
  }); */
});
