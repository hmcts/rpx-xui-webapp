import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AlertService,
  CaseUIToolkitModule,
  ErrorNotifierService
} from '@hmcts/ccd-case-ui-toolkit';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { SessionStorageService } from '@hmcts/ccd-case-ui-toolkit/dist/shared';

import { CaseDetailsHomeComponent } from '..';
import { reducers } from '../../../app/store';
import { InfoMessage } from '../../../work-allocation/enums';
import * as fromFeature from '../../store';

describe('CaseDetailsHomeComponent', () => {
  let component: CaseDetailsHomeComponent;
  let fixture: ComponentFixture<CaseDetailsHomeComponent>;
  const mockAlertService = jasmine.createSpyObj('alertService', ['success', 'setPreserveAlerts', 'error']);
  const mockErrorNotifierService = jasmine.createSpyObj('ErrorNotifierService', ['announceError']);
  const mockActivatedRoute = { data: of({case: {case_id: '1234', case_type: {id: 'caseTypeId', jurisdiction: {id: 'IA'}}}})};
  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['setItem']);
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
        { provide: ErrorNotifierService, useValue: mockErrorNotifierService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SessionStorageService, useValue: mockSessionStorageService  }
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

    it('ngOnInit', () => {
      component.ngOnInit();
      expect(mockSessionStorageService.setItem).toHaveBeenCalled();
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

    it('should have a success message that is shown', () => {
      // as data has been set up beforehand to have been redirected from avialable tasks
      // the alert service will have been called
      expect(mockAlertService.setPreserveAlerts).toHaveBeenCalled();
      expect(mockAlertService.success).toHaveBeenCalled();
    });

  });

});
