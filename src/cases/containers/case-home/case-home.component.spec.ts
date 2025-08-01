import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AlertService,
  ErrorNotifierService, HttpError, LoadingService as CCDLoadingService, NavigationNotifierService, NavigationOrigin
} from '@hmcts/ccd-case-ui-toolkit';
import { LoadingService as CommonLibLoadingService } from '@hmcts/rpx-xui-common-lib';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { CaseHomeComponent } from '..';
import { reducers } from '../../../app/store';
import * as fromFeature from '../../store';

describe('CaseHomeComponent', () => {
  let component: CaseHomeComponent;
  let fixture: ComponentFixture<CaseHomeComponent>;
  const mockAlertService = jasmine.createSpyObj('alertService', ['success', 'setPreserveAlerts', 'error']);
  const mockErrorNotifierService = jasmine.createSpyObj('ErrorNotifierService', ['announceError']);
  let navigationNotifierService: NavigationNotifierService;
  const mockCommonLibLoadingService = jasmine.createSpyObj('CommonLibLoadingService', ['']);
  const mockCCDLoadingService = jasmine.createSpyObj('CCDLoadingService', ['']);
  let store: Store<fromFeature.State>;
  let storeDispatchMock: any;

  beforeEach(waitForAsync(() => {
    navigationNotifierService = new NavigationNotifierService();
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ ...reducers, cases: combineReducers(fromFeature.reducers) })
      ],
      declarations: [CaseHomeComponent],
      providers: [
        { provide: AlertService, useValue: mockAlertService },
        { provide: NavigationNotifierService, useValue: navigationNotifierService },
        { provide: ErrorNotifierService, useValue: mockErrorNotifierService },
        { provide: CommonLibLoadingService, useValue: mockCommonLibLoadingService },
        { provide: CCDLoadingService, useValue: mockCCDLoadingService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    storeDispatchMock = spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(CaseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  describe('paramHandler', () => {
    it('should create params for DRAFT_DELETED', () => {
      const navigation = {
        action: NavigationOrigin.DRAFT_DELETED
      };
      const result = component.paramHandler(navigation);
      const resultingKeys = Object.keys(result);
      expect(resultingKeys).toContain('path');
      expect(resultingKeys).toContain('callback');

      result.callback();
      expect(mockAlertService.setPreserveAlerts).toHaveBeenCalled();
      expect(mockAlertService.success).toHaveBeenCalled();
    });

    it('should create params for ERROR_DELETING_DRAFT', () => {
      const navigation = {
        action: NavigationOrigin.ERROR_DELETING_DRAFT
      };
      const result = component.paramHandler(navigation);
      const resultingKeys = Object.keys(result);
      expect(resultingKeys).toContain('path');
    });

    it('should create params for DRAFT_RESUMED', () => {
      const navigation = {
        action: NavigationOrigin.DRAFT_RESUMED
      };
      const result = component.paramHandler(navigation);
      const resultingKeys = Object.keys(result);
      expect(resultingKeys).toContain('path');
      expect(resultingKeys).toContain('query');
      expect(resultingKeys).toContain('errorHandler');

      const mockComponentHandleError = spyOn(component, 'handleErrorWithTriggerId');
      result.errorHandler({});
      expect(mockComponentHandleError).toHaveBeenCalled();
    });

    it('should create params for EVENT_TRIGGERED', () => {
      const navigation = {
        action: NavigationOrigin.EVENT_TRIGGERED,
        relativeTo: {
          snapshot: {
            params: {
              cid: 'cid'
            }
          }
        }
      };
      const result = component.paramHandler(navigation);
      const resultingKeys = Object.keys(result);
      expect(resultingKeys).toContain('path');
      expect(resultingKeys).toContain('query');
      expect(resultingKeys).toContain('errorHandler');

      const mockComponentHandleError = spyOn(component, 'handleErrorWithTriggerId');
      result.errorHandler({});
      expect(mockComponentHandleError).toHaveBeenCalled();
    });

    it('should create params for NO_READ_ACCESS_REDIRECTION', () => {
      const navigation = {
        action: NavigationOrigin.NO_READ_ACCESS_REDIRECTION
      };
      const result = component.paramHandler(navigation);
      const resultingKeys = Object.keys(result);
      expect(resultingKeys).toContain('path');
      expect(resultingKeys).toContain('callback');

      result.callback();
      expect(mockAlertService.success).toHaveBeenCalled();
    });

    it('should create default params', () => {
      const navigation = {
        action: 999,
        relativeTo: {
          snapshot: {
            params: {
              cid: 'cid'
            }
          }
        }
      };
      const result = component.paramHandler(navigation);
      const resultingKeys = Object.keys(result);
      expect(resultingKeys).toContain('path');
    });
  });

  describe('actionDispatcher', () => {
    it('should dispatch an action', () => {
      const params = {
        path: []
      };
      component.actionDispatcher(params);

      expect(storeDispatchMock).toHaveBeenCalled();
    });
  });

  describe('handleErrorWithTriggerId', () => {
    it('should handle error', () => {
      const error: HttpError = new HttpError();
      error.status = 400;
      const triggerId = 'dummy';

      component.handleErrorWithTriggerId(error, triggerId);

      expect(mockErrorNotifierService.announceError).toHaveBeenCalledWith(error);
      expect(mockAlertService.error).toHaveBeenCalledWith({ phrase: error.message });
    });
  });

  describe('handleCaseViewError', () => {
    it('should throw back the error as is', () => {
      const errorIn: Error = new Error();
      try {
        component.handleCaseViewError(errorIn);
      } catch (errorOut) {
        expect(errorOut).toBe(errorIn);
      }
    });
  });
});
