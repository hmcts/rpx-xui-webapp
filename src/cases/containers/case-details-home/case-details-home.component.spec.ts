import * as fromFeature from '../../store';

import {
  AlertService,
  CaseUIToolkitModule,
  ErrorNotifierService
} from '@hmcts/ccd-case-ui-toolkit';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CaseDetailsHomeComponent } from '..';
import { InfoMessage } from '../../../work-allocation/enums';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { reducers } from '../../../app/store';

describe('CaseDetailsHomeComponent', () => {
  let component: CaseDetailsHomeComponent;
  let fixture: ComponentFixture<CaseDetailsHomeComponent>;
  const mockAlertService = jasmine.createSpyObj('alertService', ['success', 'setPreserveAlerts', 'error']);
  const mockErrorNotifierService = jasmine.createSpyObj('ErrorNotifierService', ['announceError']);
  let mockRouter: jasmine.SpyObj<Router>;
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

  describe('entering page normally', () => {

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

    it('should not have a success message that is shown', () => {
      expect(mockAlertService.success).not.toHaveBeenCalled();
    });

  });

  describe('redirected from available-tasks assignment', () => {

    beforeEach(() => {
      mockRouter = TestBed.get(Router);
      spyOn(mockRouter, 'getCurrentNavigation').and.returnValues({extras: { state: { showMessage: true, messageText: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS}}});
      store = TestBed.get(Store);
      storeDispatchMock = spyOn(store, 'dispatch');
      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not have a success message that is shown', () => {
      // as data has been set up beforehand to have been redirected from avialable tasks
      // the alert service will have been called
      expect(mockAlertService.success).toHaveBeenCalled();
    });

  });

});
