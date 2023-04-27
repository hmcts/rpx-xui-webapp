import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import {
  AlertService,
  ErrorNotifierService,
  SessionStorageService
} from '@hmcts/ccd-case-ui-toolkit';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { CaseDetailsHomeComponent } from './case-details-home.component';
import { CaseReferencePipe } from '../../../hearings/pipes/case-reference.pipe';
import { reducers } from '../../../app/store';
import { InfoMessage } from '../../../work-allocation/enums';
import * as fromFeature from '../../store';

describe('CaseDetailsHomeComponent', () => {
  let component: CaseDetailsHomeComponent;
  let fixture: ComponentFixture<CaseDetailsHomeComponent>;
  const mockAlertService = jasmine.createSpyObj('alertService', ['success', 'setPreserveAlerts', 'error']);
  const mockErrorNotifierService = jasmine.createSpyObj('ErrorNotifierService', ['announceError']);
  const mockActivatedRoute = { data: of({ case: { case_id: '1234', case_type: { id: 'caseTypeId', jurisdiction: { id: 'IA' } } } }) };
  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['setItem']);
  let mockRouter: any;
  let store: Store<fromFeature.State>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let storeDispatchMock: any;

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
        { provide: SessionStorageService, useValue: mockSessionStorageService }
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
      expect(mockSessionStorageService.setItem).toHaveBeenCalled();
    });

    it('should not have a success message that is shown', () => {
      expect(mockAlertService.success).not.toHaveBeenCalled();
    });
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
});

describe('CaseDetailsHomeComponent set the page title on init', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: CaseDetailsHomeComponent;
  let fixture: ComponentFixture<CaseDetailsHomeComponent>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let sessionStorageServiceMock: jasmine.SpyObj<SessionStorageService>;
  let titleServiceMock: jasmine.SpyObj<Title>;
  let caseReferencePipeMock: jasmine.SpyObj<CaseReferencePipe>;

  beforeEach(() => {
    activatedRouteMock = {
      data: of({
        case: {
          case_id: '123',
          case_type: {
            id: '456',
            jurisdiction: {
              id: '789'
            }
          },
          tabs: [
            {
              id: 'caseDetails',
              fields: [
                {
                  id: 'appellantGivenNames',
                  formatted_value: 'John'
                },
                {
                  id: 'appellantFamilyName',
                  formatted_value: 'Doe'
                }
              ]
            },
            {
              id: 'overview',
              fields: [
                {
                  id: 'appealReferenceNumber',
                  formatted_value: 'AA/12345/2019'
                }
              ]
            }
          ]
        }
      })
    };

    sessionStorageServiceMock = jasmine.createSpyObj<SessionStorageService>('SessionStorageService', ['setItem']);
    titleServiceMock = jasmine.createSpyObj<Title>('Title', ['setTitle']);
    caseReferencePipeMock = jasmine.createSpyObj<CaseReferencePipe>('CaseReferencePipe', ['transform']);

    TestBed.configureTestingModule({
      declarations: [CaseDetailsHomeComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: SessionStorageService, useValue: sessionStorageServiceMock },
        { provide: Title, useValue: titleServiceMock },
        { provide: CaseReferencePipe, useValue: caseReferencePipeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CaseDetailsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the title of the page', () => {
    expect(titleServiceMock.setTitle).toHaveBeenCalledWith('John Doe (AA/12345/2019) - HM Courts & Tribunals Service - GOV.UK');
  });
});
