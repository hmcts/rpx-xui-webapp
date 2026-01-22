import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AlertService,
  ErrorNotifierService,
  SessionStorageService
} from '@hmcts/ccd-case-ui-toolkit';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { CaseDetailsHomeComponent } from '..';
import { reducers } from '../../../app/store';
import * as fromFeature from '../../store';
import { InfoMessage } from '../../../app/shared/enums/info-message';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { NoResultsMessageId } from '../../../search/enums';

describe('CaseDetailsHomeComponent', () => {
  let component: CaseDetailsHomeComponent;
  let fixture: ComponentFixture<CaseDetailsHomeComponent>;
  const mockAlertService = jasmine.createSpyObj('alertService', ['success', 'setPreserveAlerts', 'error']);
  const mockErrorNotifierService = jasmine.createSpyObj('ErrorNotifierService', ['announceError']);
  const mockActivatedRoute: any = { data: of({ case: { case_id: '1234', case_type: { id: 'caseTypeId', jurisdiction: { id: 'IA' } } } }) };
  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['setItem']);
  let mockRouter: any;
  let store: Store<fromFeature.State>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let storeDispatchMock: any;
  const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log', 'error']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ ...reducers, cases: combineReducers(fromFeature.reducers) })
      ],
      declarations: [CaseDetailsHomeComponent],
      providers: [
        { provide: AlertService, useValue: mockAlertService },
        { provide: ErrorNotifierService, useValue: mockErrorNotifierService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: LoggerService, useValue: mockLoggerService }
      ]
    })
      .compileComponents();
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
      spyOn(mockRouter, 'getCurrentNavigation').and.returnValues({ extras: { state: { showMessage: true, messageText: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS } } } as unknown as Navigation);
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

  describe('ngOnInit with case data scenarios', () => {
    it('should set caseInfo when valid case data is provided', () => {
      const mockRoute = {
        data: of({
          case: {
            case_id: '1234567890123456',
            case_type: {
              id: 'Immigration',
              jurisdiction: {
                id: 'IA'
              }
            }
          }
        })
      };
      TestBed.overrideProvider(ActivatedRoute, { useValue: mockRoute });
      mockRouter = TestBed.inject(Router);
      spyOn(mockRouter, 'getCurrentNavigation').and.returnValue(null);
      store = TestBed.inject(Store);
      storeDispatchMock = spyOn(store, 'dispatch');
      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      component = fixture.componentInstance;

      component.ngOnInit();

      expect(component.caseInfo).toEqual({
        cid: '1234567890123456',
        caseType: 'Immigration',
        jurisdiction: 'IA'
      });
    });

    it('should navigate to no results page when case is not found', () => {
      const mockRoute = {
        data: of({ case: null })
      };
      TestBed.overrideProvider(ActivatedRoute, { useValue: mockRoute });
      mockRouter = TestBed.inject(Router);
      spyOn(mockRouter, 'getCurrentNavigation').and.returnValue(null);
      spyOn(mockRouter, 'navigate').and.returnValue(Promise.resolve(true));
      store = TestBed.inject(Store);
      storeDispatchMock = spyOn(store, 'dispatch');
      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      component = fixture.componentInstance;

      component.ngOnInit();

      expect(mockLoggerService.error).toHaveBeenCalledWith('CaseDetailsHomeComponent: Case not found, redirecting to no results page');
      expect(mockRouter.navigate).toHaveBeenCalledWith(
        ['/search/noresults'],
        { state: { messageId: NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH }, relativeTo: mockRoute }
      );
    });

    it('should log message when case data is incomplete', () => {
      const mockRoute = {
        data: of({ case: { case_id: '123' } })
      };
      TestBed.overrideProvider(ActivatedRoute, { useValue: mockRoute });
      mockRouter = TestBed.inject(Router);
      spyOn(mockRouter, 'getCurrentNavigation').and.returnValue(null);
      store = TestBed.inject(Store);
      storeDispatchMock = spyOn(store, 'dispatch');
      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      component = fixture.componentInstance;

      component.ngOnInit();

      expect(mockLoggerService.log).toHaveBeenCalledWith('CaseDetailsHomeComponent: No data available to add caseInfo details in session storage');
    });

    it('should handle error when resolver fails', () => {
      const mockError = new Error('Resolver error');
      const mockRoute = {
        data: throwError(() => mockError)
      };
      TestBed.overrideProvider(ActivatedRoute, { useValue: mockRoute });
      mockRouter = TestBed.inject(Router);
      spyOn(mockRouter, 'getCurrentNavigation').and.returnValue(null);
      spyOn(mockRouter, 'navigate').and.returnValue(Promise.resolve(true));
      store = TestBed.inject(Store);
      storeDispatchMock = spyOn(store, 'dispatch');
      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      component = fixture.componentInstance;

      component.ngOnInit();

      expect(mockLoggerService.error).toHaveBeenCalledWith('CaseDetailsHomeComponent: Error loading case data', mockError);
      expect(mockRouter.navigate).toHaveBeenCalledWith(
        ['/search/noresults'],
        { state: { messageId: NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH }, relativeTo: mockRoute }
      );
    });
  });

  describe('navigateToNoResultsPage', () => {
    it('should navigate to no results page with correct parameters', async () => {
      const mockRoute = { data: of({ case: { case_id: '123', case_type: { id: 'type', jurisdiction: { id: 'IA' } } } }) };
      TestBed.overrideProvider(ActivatedRoute, { useValue: mockRoute });
      mockRouter = TestBed.inject(Router);
      spyOn(mockRouter, 'getCurrentNavigation').and.returnValue(null);
      spyOn(mockRouter, 'navigate').and.returnValue(Promise.resolve(true));
      store = TestBed.inject(Store);
      storeDispatchMock = spyOn(store, 'dispatch');
      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      component = fixture.componentInstance;

      // eslint-disable-next-line dot-notation
      component['navigateToNoResultsPage']();

      expect(mockRouter.navigate).toHaveBeenCalledWith(
        ['/search/noresults'],
        { state: { messageId: NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH }, relativeTo: mockRoute }
      );
    });

    it('should handle navigation error and log it', async () => {
      const mockError = new Error('Navigation failed');
      const mockRoute = { data: of({ case: { case_id: '123', case_type: { id: 'type', jurisdiction: { id: 'IA' } } } }) };
      TestBed.overrideProvider(ActivatedRoute, { useValue: mockRoute });
      mockRouter = TestBed.inject(Router);
      spyOn(mockRouter, 'getCurrentNavigation').and.returnValue(null);
      spyOn(mockRouter, 'navigate').and.returnValue(Promise.reject(mockError));
      store = TestBed.inject(Store);
      storeDispatchMock = spyOn(store, 'dispatch');
      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      component = fixture.componentInstance;

      // eslint-disable-next-line dot-notation
      component['navigateToNoResultsPage']();

      // Wait for the promise to resolve
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockLoggerService.error).toHaveBeenCalledWith('Error navigating to /search/noresults', mockError);
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      mockRouter = TestBed.inject(Router);
      spyOn(mockRouter, 'getCurrentNavigation').and.returnValue(null);
      store = TestBed.inject(Store);
      storeDispatchMock = spyOn(store, 'dispatch');
      fixture = TestBed.createComponent(CaseDetailsHomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should complete the destroy$ subject', () => {
      // eslint-disable-next-line dot-notation
      const destroySubject = component['destroy$'];
      spyOn(destroySubject, 'next');
      spyOn(destroySubject, 'complete');

      component.ngOnDestroy();

      expect(destroySubject.next).toHaveBeenCalled();
      expect(destroySubject.complete).toHaveBeenCalled();
    });

    it('should unsubscribe from subscriptions when destroyed', () => {
      // eslint-disable-next-line dot-notation
      const destroySubject = component['destroy$'];
      const nextSpy = spyOn(destroySubject, 'next');
      const completeSpy = spyOn(destroySubject, 'complete');

      component.ngOnInit();
      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
