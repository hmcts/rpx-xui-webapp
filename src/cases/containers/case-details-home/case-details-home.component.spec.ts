import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, ErrorNotifierService, SessionStorageService } from '@hmcts/ccd-case-ui-toolkit';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { CaseDetailsHomeComponent } from '..';
import { reducers } from '../../../app/store';
import * as fromFeature from '../../store';
import { InfoMessage } from '../../../app/shared/enums/info-message';
import { LoggerService } from 'src/app/services/logger/logger.service';

describe('CaseDetailsHomeComponent', () => {
  let component: CaseDetailsHomeComponent;
  let fixture: ComponentFixture<CaseDetailsHomeComponent>;
  const mockAlertService = jasmine.createSpyObj('alertService', ['success', 'setPreserveAlerts', 'error']);
  const mockErrorNotifierService = jasmine.createSpyObj('ErrorNotifierService', ['announceError']);
  const mockActivatedRoute: any = {
    data: of({ case: { case_id: '1234', case_type: { id: 'caseTypeId', jurisdiction: { id: 'IA' } } } }),
  };
  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['setItem']);
  let mockRouter: any;
  let store: Store<fromFeature.State>;

  let storeDispatchMock: any;
  const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, StoreModule.forRoot({ ...reducers, cases: combineReducers(fromFeature.reducers) })],
      declarations: [CaseDetailsHomeComponent],
      providers: [
        { provide: AlertService, useValue: mockAlertService },
        { provide: ErrorNotifierService, useValue: mockErrorNotifierService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    }).compileComponents();
  }));

  describe('entering page normally', () => {
    beforeEach(() => {
      store = TestBed.inject(Store);
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
    });

    it('should not have a success message that is shown', () => {
      expect(mockAlertService.success).not.toHaveBeenCalled();
    });

    /*
    it('should log a message when no data available in route', () => {
      mockActivatedRoute.data = of({});
      component.ngOnInit();
      expect(mockLoggerService.log).toHaveBeenCalledWith('CaseDetailsHomeComponent: No data available to add caseInfo details in session storage');
    });
    */
  });

  describe('redirected from available-tasks assignment', () => {
    beforeEach(() => {
      mockRouter = TestBed.inject(Router);
      spyOn(mockRouter, 'getCurrentNavigation').and.returnValues({
        extras: { state: { showMessage: true, messageText: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS } },
      } as unknown as Navigation);
      store = TestBed.inject(Store);
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

  describe('redirected after router navigation has completed', () => {
    it('shows the success message from history state', () => {
      const router = TestBed.inject(Router);
      spyOn(router, 'getCurrentNavigation').and.returnValue(null);
      const replaceState = jasmine.createSpy('replaceState');
      const state = { navigationId: 7, showMessage: true, messageText: "You've reallocated a role" };
      spyOnProperty(window, 'history', 'get').and.returnValue({
        state,
        replaceState,
      } as unknown as History);

      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      fixture.detectChanges();

      expect(mockAlertService.success).toHaveBeenCalledWith({ phrase: "You've reallocated a role" });
      expect(replaceState).toHaveBeenCalledWith({ ...state, showMessage: false }, '');
    });

    it('does not show or consume incomplete confirmation state', () => {
      const router = TestBed.inject(Router);
      spyOn(router, 'getCurrentNavigation').and.returnValue(null);
      const replaceState = jasmine.createSpy('replaceState');
      spyOnProperty(window, 'history', 'get').and.returnValue({
        state: { showMessage: true },
        replaceState,
      } as unknown as History);
      mockAlertService.success.calls.reset();

      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      fixture.detectChanges();

      expect(mockAlertService.success).not.toHaveBeenCalled();
      expect(replaceState).not.toHaveBeenCalled();
    });

    it('does not replay a consumed confirmation on a second initialization', () => {
      const router = TestBed.inject(Router);
      spyOn(router, 'getCurrentNavigation').and.returnValue(null);
      let state = { showMessage: true, messageText: "You've reallocated a role" };
      spyOnProperty(window, 'history', 'get').and.returnValue({
        get state() {
          return state;
        },
        replaceState: (nextState) => {
          state = nextState;
        },
      } as unknown as History);
      mockAlertService.success.calls.reset();

      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      fixture.detectChanges();
      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      fixture.detectChanges();

      expect(mockAlertService.success).toHaveBeenCalledTimes(1);
    });
  });
});
