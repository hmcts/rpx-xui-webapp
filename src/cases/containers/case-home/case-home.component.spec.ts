import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CaseUIToolkitModule,
  AlertService,
  NavigationOrigin,
  HttpError,
  ErrorNotifierService
} from '@hmcts/ccd-case-ui-toolkit';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseHomeComponent } from '..';
import { ExUITitleService } from 'src/app/shared/services/exui-title.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { reducers } from 'src/app/store';
import * as fromFeature from '../../store';

describe('CaseHomeComponent', () => {
  let component: CaseHomeComponent;
  let fixture: ComponentFixture<CaseHomeComponent>;
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
        StoreModule.forRoot({...reducers, cases: combineReducers(fromFeature.appReducers)}),
      ],
      declarations: [CaseHomeComponent],
      providers: [
        ExUITitleService,
        { provide: AlertService, useValue: mockAlertService },
        { provide: ErrorNotifierService, useValue: mockErrorNotifierService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    store = TestBed.get(Store);
    storeDispatchMock = spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(CaseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

      const mockComponentHandleError = spyOn(component, 'handleError');
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

      const mockComponentHandleError = spyOn(component, 'handleError');
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

  describe('handleError', () => {

    it('should handle error', () => {
      const error: HttpError = new HttpError();
      error.status = 400;
      const triggerId = 'dummy';

      component.handleError(error, triggerId);

      expect(mockErrorNotifierService.announceError).toHaveBeenCalledWith(error);
      expect(mockAlertService.error).toHaveBeenCalledWith(error.message);
    });
  });
});
