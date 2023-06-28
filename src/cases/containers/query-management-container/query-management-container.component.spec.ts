import { Location } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CaseNotifier,
  CaseView,
  FormDocument,
  QualifyingQuestionsErrorMessage,
  QueryItemType,
  QueryWriteRaiseQueryComponent,
  QueryWriteRespondToQueryComponent
} from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { BehaviorSubject } from 'rxjs';
import { QueryManagementContainerComponent } from './query-management-container.component';
import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Pipe({ name: 'rpxTranslate' })
class MockRpxTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('QueryManagementContainerComponent', () => {
  let component: QueryManagementContainerComponent;
  let fixture: ComponentFixture<QueryManagementContainerComponent>;
  let activatedRoute: ActivatedRoute;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  const mockFeatureToggleService = jasmine.createSpyObj('featureToggleService', ['getValue']);
  const locationMock = jasmine.createSpyObj('Location', ['back']);
  const CASE_VIEW: CaseView = {
    case_id: '1234',
    case_type: {
      id: 'TestAddressBookCase',
      name: 'Test Address Book Case',
      jurisdiction: {
        id: 'TEST',
        name: 'Test'
      }
    },
    channels: [],
    state: {
      id: 'CaseCreated',
      name: 'Case created'
    },
    tabs: [],
    triggers: [],
    events: []
  };
  const casesService = jasmine.createSpyObj('casesService', ['caseView, cachedCaseView']);
  const mockCaseNotifier = new CaseNotifier(casesService);
  mockCaseNotifier.caseView = new BehaviorSubject(CASE_VIEW).asObservable();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        QueryManagementContainerComponent,
        QueryWriteRaiseQueryComponent,
        QueryWriteRespondToQueryComponent,
        MockRpxTranslatePipe
      ],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              data: {},
              params: { cid: '123' }
            }
          }
        },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: locationMock },
        { provide: CaseNotifier, useValue: mockCaseNotifier },
        { provide: FeatureToggleService, useValue: mockFeatureToggleService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryManagementContainerComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('showResponseForm - should not show summary', () => {
    component.showResponseForm();
    expect(component.showSummary).toBeFalsy();
  });

  it('should navigate to previous page', () => {
    component.previous();
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('should navigate to qualifying questions selection page', () => {
    component.queryCreateContext = QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_DETAIL;
    component.previous();
    expect(component.queryCreateContext).toEqual(QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
  });

  describe('when it does not have a query id', () => {
    it('should set the query create context', () => {
      expect(component.queryCreateContext).toEqual(QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
    });

    it('should not set the query item', () => {
      expect(component.queryItem).toBeUndefined();
    });

    it('should set the queryCreateContext to be query item type of new query qualifying question options', () => {
      expect(component.queryCreateContext).toEqual(QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
    });

    it('should have the ccd-qualifying-question-options component', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('ccd-qualifying-question-options')).toBeTruthy();
    });

    describe('validators', () => {
      it('should set fullName required validator', () => {
        const fullNameControl = component.formGroup.get('fullName') as FormControl;
        expect(Object.keys(fullNameControl.validator(fullNameControl))).toContain('required');
      });

      it('should set isHearingRelated required validator', () => {
        const isHearingControl = component.formGroup.get('isHearingRelated') as FormControl;
        expect(Object.keys(isHearingControl.validator(isHearingControl))).toContain('required');
      });
    });
  });

  describe('when it has a query id', () => {
    beforeEach(() => {
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: '2' } } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should set the query item', () => {
      expect(component.queryItem).toBeDefined();
    });
  });

  describe('onDocumentCollectionUpdate', () => {
    beforeEach(() => {
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: '1' } } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should set documents value', () => {
      const documents: FormDocument[] = [
        {
          document_filename: 'file1',
          document_url: 'url1',
          document_binary_url: 'binary_url1'
        },
        {
          document_filename: 'file2',
          document_url: 'url2',
          document_binary_url: 'binary_url2'
        }
      ];

      component.onDocumentCollectionUpdate(documents);
      expect(component.formGroup.get('attachments').value).toEqual([
        {
          _links: {
            self: {
              href: documents[0].document_url
            },
            binary: {
              href: documents[0].document_binary_url
            }
          },
          originalDocumentName: documents[0].document_filename
        },
        {
          _links: {
            self: {
              href: documents[1].document_url
            },
            binary: {
              href: documents[1].document_binary_url
            }
          },
          originalDocumentName: documents[1].document_filename
        }
      ]);
    });
  });

  describe('submitForm', () => {
    it('should set submitted to true and initiate form validation', () => {
      spyOn(component, 'validateForm');
      component.queryCreateContext = QueryItemType.NEW_QUERY;
      component.submitForm();
      expect(component.submitted).toEqual(true);
      expect(component.validateForm).toHaveBeenCalled();
    });

    it('should navigate to raise a new query page after qualifying question is selected', () => {
      spyOn(component, 'validateForm');
      component.qualifyingQuestion = {
        name: 'Raise another query relating to this case',
        markdown: '',
        url: `/query-management/query/123/${QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION}}`
      };
      fixture.detectChanges();
      component.queryCreateContext = QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_DETAIL;
      component.submitForm();
      expect(component.showSummary).toEqual(false);
      expect(mockRouter.navigateByUrl).toHaveBeenCalled();
      expect(component.validateForm).not.toHaveBeenCalled();
    });

    describe('queryCreateContext is QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS', () => {
      beforeEach(() => {
        component.queryCreateContext = QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS;
      });

      it('should mark control as touched', () => {
        spyOn(component.qualifyingQuestionsControl, 'markAsTouched');
        component.submitForm();
        expect(component.qualifyingQuestionsControl.markAsTouched).toHaveBeenCalled();
      });

      describe('qualifyingQuestionsControl is valid', () => {
        const qualifyingQuestion = {
          name: 'Raise another query relating to this case',
          markdown: '<p>Test markdown</p>',
          url: '/query-management/query/123/2'
        };
        beforeEach(() => {
          component.qualifyingQuestionsControl.setValue(qualifyingQuestion);
        });

        it('should set queryCreateContext to QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_DETAIL', () => {
          spyOn(component, 'validateQualifyingQuestion').and.returnValue(true);
          component.submitForm();
          expect(component.queryCreateContext).toEqual(QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_DETAIL);
        });

        it('should not change the queryCreateContext if qualifying questions validation failed', () => {
          spyOn(component, 'validateQualifyingQuestion').and.returnValue(false);
          component.submitForm();
          expect(component.queryCreateContext).toEqual(QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
        });
      });

      describe('qualifyingQuestionsControl is valid with empty markdown', () => {
        const qualifyingQuestion = {
          name: 'Raise another query relating to this case',
          markdown: '',
          url: '/query-management/query/123/2'
        };
        beforeEach(() => {
          component.qualifyingQuestionsControl.setValue(qualifyingQuestion);
        });

        it('should not change queryCreateContext and navigate to the URL specified in the config', () => {
          spyOn(component, 'validateQualifyingQuestion').and.returnValue(true);
          component.submitForm();
          expect(component.queryCreateContext).toEqual(QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
          expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/query-management/query/123/2');
        });

        it('should not change the queryCreateContext if qualifying questions validation failed', () => {
          spyOn(component, 'validateQualifyingQuestion').and.returnValue(false);
          component.submitForm();
          expect(component.queryCreateContext).toEqual(QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
        });
      });

      describe('qualifyingQuestionsControl is not valid', () => {
        beforeEach(() => {
          component.qualifyingQuestionsControl.setValue(null);
        });

        it('should set error messages when control is empty', () => {
          component.submitForm();
          expect(component.errorMessages).toEqual([
            {
              title: '',
              description: QualifyingQuestionsErrorMessage.SELECT_AN_OPTION,
              fieldId: 'qualifyingQuestionsOption'
            }
          ]);
        });

        it('should scroll to top', () => {
          spyOn(window, 'scrollTo');
          component.submitForm();
          expect(window.scrollTo).toHaveBeenCalledWith({ left: 0, top: 0, behavior: 'smooth' });
        });
      });
    });
  });

  describe('validateForm', () => {
    beforeEach(() => {
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: 'raiseAQuery' } } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should validate the form', () => {
      const nativeElement = fixture.debugElement.nativeElement;
      component.formGroup.get('fullName').setValue('');
      component.formGroup.get('subject').setValue('');
      component.formGroup.get('body').setValue('');
      component.submitForm();
      fixture.detectChanges();
      expect(nativeElement.querySelector('.govuk-error-summary')).toBeDefined();

      component.formGroup.get('fullName').setValue('John Smith');
      component.formGroup.get('subject').setValue('Bring relatives');
      component.formGroup.get('body').setValue('Can I bring my grandma with me so she get out from the residence?');
      component.formGroup.get('isHearingRelated').setValue(false);
      component.submitForm();
      fixture.detectChanges();
      expect(nativeElement.querySelector('.govuk-error-summary')).toBeNull();
    });
  });

  describe('validateQualifyingQuestion', () => {
    it('should return true with no error message', () => {
      const qualifyingQuestion = {
        name: 'Raise another query relating to this case',
        markdown: '',
        url: '/query-management/query/123/2'
      };
      component.qualifyingQuestionsControl.setValue(qualifyingQuestion);
      component.queryCreateContext = QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS;
      expect(component.validateQualifyingQuestion()).toEqual(true);
      expect(component.qualifyingQuestionsControl.valid).toBe(true);
    });

    it('should return false with error message', () => {
      component.qualifyingQuestionsControl.setValue(null);
      component.queryCreateContext = QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS;
      expect(component.validateQualifyingQuestion()).toEqual(false);
      expect(component.qualifyingQuestionsControl.valid).toBe(false);
      expect(component.errorMessages[0]).toEqual({ title: '', description: QualifyingQuestionsErrorMessage.SELECT_AN_OPTION, fieldId: 'qualifyingQuestionsOption' });
    });
  });

  describe('navigateToErrorElement', () => {
    beforeEach(() => {
      // Raise a query
      activatedRoute.snapshot = {
        ...activatedRoute.snapshot,
        params: { qid: QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION }
      } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should navigate to the correct element', () => {
      const nativeElement = fixture.debugElement.nativeElement;
      component.formGroup.get('fullName').setValue('');
      component.formGroup.get('subject').setValue('');
      component.formGroup.get('body').setValue('');
      component.submitForm();
      fixture.detectChanges();
      expect(nativeElement.querySelector('.govuk-error-summary')).toBeDefined();
      nativeElement.querySelector('#error-fullName').click();
      fixture.detectChanges();
      const fullNameElement = nativeElement.querySelector('#fullName');
      const focusedElement = fixture.debugElement.query(By.css(':focus')).nativeElement;
      expect(focusedElement).toBe(fullNameElement);
    });
  });

  describe('getQueryCreateContext', () => {
    it('should return query item type respond as the query context', () => {
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: '3' } } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      expect(component.queryCreateContext).toEqual(QueryItemType.RESPOND);
    });

    it('should return query item type follow up as the query context', () => {
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: '4' } } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      expect(component.queryCreateContext).toEqual(QueryItemType.FOLLOWUP);
    });

    it('should return query item type new query qualifying question options as the query context', () => {
      component.queryCreateContext = QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_DETAIL;
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: '5' } } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      expect(component.queryCreateContext).toEqual(QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
    });
  });
});
