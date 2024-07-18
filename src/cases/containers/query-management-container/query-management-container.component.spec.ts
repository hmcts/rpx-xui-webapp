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
  QueryCreateContext,
  QueryWriteRaiseQueryComponent,
  QueryWriteRespondToQueryComponent
} from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { provideMockStore } from '@ngrx/store/testing';
import { BehaviorSubject } from 'rxjs';
import { RaiseQueryErrorMessage } from '../../models/raise-query-error-message.enum';
import { QueryManagementContainerComponent } from './query-management-container.component';

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
  let router: Router;

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
        provideMockStore({
          initialState: {
            appConfig: {
              userDetails: {
                userInfo: {
                  name: 'Test User'
                }
              }
            }
          }
        }),
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              data: {
                case: CASE_VIEW
              },
              params: {
                cid: '123'
              }
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
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('showResponseForm - should not show summary', () => {
    component.showResponseForm();
    expect(component.showSummary).toBeFalsy();
  });

  it('showConfirmationPage - should show confirmation page', () => {
    component.showConfirmationPage();
    expect(component.showSummary).toEqual(false);
    expect(component.showConfirmation).toEqual(true);
  });

  it('should navigate to previous page', () => {
    component.previous();
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('should navigate to qualifying questions selection page', () => {
    component.queryCreateContext = QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_DETAIL;
    component.previous();
    expect(component.queryCreateContext).toEqual(QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
  });

  describe('when it does not have a query id', () => {
    it('should set the query create context', () => {
      expect(component.queryCreateContext).toEqual(QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
    });

    it('should not set the query item', () => {
      expect(component.queryItem).toBeUndefined();
    });

    it('should set the queryCreateContext to be query item type of new query qualifying question options', () => {
      expect(component.queryCreateContext).toEqual(QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
    });

    it('should have the ccd-qualifying-question-options component', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('ccd-qualifying-question-options')).toBeTruthy();
    });

    it('should have required validators for subject and isHearingRelated', () => {
      const subjectControl = component.formGroup.get('subject');
      const isHearingRelatedControl = component.formGroup.get('isHearingRelated');

      subjectControl.setValue(null);
      isHearingRelatedControl.setValue(null);

      expect(subjectControl.hasError('required')).toBe(true);
      expect(isHearingRelatedControl.hasError('required')).toBe(true);
    });
  });

  describe('when it has a query id', () => {
    beforeEach(() => {
      activatedRoute.snapshot = {
        ...activatedRoute.snapshot,
        params: {
          ...activatedRoute.snapshot.params,
          qid: '123'
        }
      } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should set the query item', () => {
      expect(component.queryItem).toBeDefined();
    });

    describe('raiseAQuery', () => {
      beforeEach(() => {
        activatedRoute.snapshot = {
          ...activatedRoute.snapshot,
          params: {
            ...activatedRoute.snapshot.params,
            qid: 'raiseAQuery'
          }
        } as unknown as ActivatedRouteSnapshot;
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should have the ccd-query-write-raise-query component', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('ccd-query-write-raise-query')).toBeTruthy();
      });
    });

    it('should not have required validators for subject and isHearingRelated', () => {
      const subjectControl = component.formGroup.get('subject');
      const isHearingRelatedControl = component.formGroup.get('isHearingRelated');

      subjectControl.setValue(null);
      isHearingRelatedControl.setValue(null);

      expect(subjectControl.hasError('required')).toBe(false);
      expect(isHearingRelatedControl.hasError('required')).toBe(false);
    });
  });

  describe('onDocumentCollectionUpdate', () => {
    beforeEach(() => {
      activatedRoute.snapshot = {
        ...activatedRoute.snapshot,
        params: {
          ...activatedRoute.snapshot.params,
          qid: 'raiseAQuery'
        }
      } as unknown as ActivatedRouteSnapshot;
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

  describe('onContinue', () => {
    it('should set submitted to true and initiate form validation', () => {
      spyOn(component, 'validateForm');
      component.queryCreateContext = QueryCreateContext.NEW_QUERY;
      component.submitForm();
      expect(component.submitted).toEqual(true);
      expect(component.validateForm).toHaveBeenCalled();
    });
  });

  describe('submitForm', () => {
    it('should set submitted to true and initiate form validation', () => {
      spyOn(component, 'validateForm');
      component.queryCreateContext = QueryCreateContext.NEW_QUERY;
      component.submitForm();
      expect(component.submitted).toEqual(true);
      expect(component.validateForm).toHaveBeenCalled();
    });

    it('should navigate to raise a new query page after qualifying question is selected', () => {
      spyOn(component, 'validateForm');
      component.qualifyingQuestion = {
        name: 'Raise a new query',
        markdown: '',
        url: `/query-management/query/123/${QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION}}`
      };
      fixture.detectChanges();
      component.queryCreateContext = QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_DETAIL;
      component.submitForm();
      expect(component.showSummary).toEqual(false);
      expect(mockRouter.navigateByUrl).toHaveBeenCalled();
      expect(component.validateForm).not.toHaveBeenCalled();
    });

    describe('queryCreateContext is QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS', () => {
      beforeEach(() => {
        component.queryCreateContext = QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS;
      });

      it('should mark control as touched', () => {
        spyOn(component.qualifyingQuestionsControl, 'markAsTouched');
        component.submitForm();
        expect(component.qualifyingQuestionsControl.markAsTouched).toHaveBeenCalled();
      });

      describe('qualifyingQuestionsControl is valid', () => {
        const qualifyingQuestion = {
          name: 'Raise a new query',
          markdown: '<p>Test markdown</p>',
          url: `/query-management/query/123/${QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION}`
        };
        beforeEach(() => {
          component.qualifyingQuestionsControl.setValue(qualifyingQuestion);
        });

        it('should set queryCreateContext to QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_DETAIL', () => {
          spyOn(component, 'validateQualifyingQuestion').and.returnValue(true);
          component.submitForm();
          expect(component.queryCreateContext).toEqual(QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_DETAIL);
        });

        it('should not change the queryCreateContext if qualifying questions validation failed', () => {
          spyOn(component, 'validateQualifyingQuestion').and.returnValue(false);
          component.submitForm();
          expect(component.queryCreateContext).toEqual(QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
        });
      });

      describe('qualifyingQuestionsControl is valid with empty markdown', () => {
        const qualifyingQuestion = {
          name: 'Raise a new query',
          markdown: '',
          url: `/query-management/query/123/${QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION}`
        };
        beforeEach(() => {
          component.qualifyingQuestionsControl.setValue(qualifyingQuestion);
        });

        it('should not change queryCreateContext and navigate to the URL specified in the config', () => {
          spyOn(component, 'validateQualifyingQuestion').and.returnValue(true);
          component.submitForm();
          expect(component.queryCreateContext).toEqual(QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
          expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`/query-management/query/123/${QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION}`);
        });

        it('should not change the queryCreateContext if qualifying questions validation failed', () => {
          spyOn(component, 'validateQualifyingQuestion').and.returnValue(false);
          component.submitForm();
          expect(component.queryCreateContext).toEqual(QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
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
      activatedRoute.snapshot = {
        ...activatedRoute.snapshot,
        params: {
          ...activatedRoute.snapshot.params,
          qid: QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION
        }
      } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should validate the form', () => {
      const nativeElement = fixture.debugElement.nativeElement;
      component.formGroup.get('subject').setValue('');
      component.formGroup.get('body').setValue('');
      component.submitForm();
      fixture.detectChanges();
      expect(nativeElement.querySelector('.govuk-error-summary')).toBeDefined();

      component.formGroup.get('subject').setValue('Bring relatives');
      component.formGroup.get('body').setValue('Can I bring my grandma with me so she get out from the residence?');
      component.formGroup.get('isHearingRelated').setValue(false);
      component.submitForm();
      fixture.detectChanges();
      expect(nativeElement.querySelector('.govuk-error-summary')).toBeNull();
    });

    it('should navigate to error element', () => {
      const nativeElement = document.getElementById('isHearingRelated-no');
      spyOn(nativeElement, 'focus');
      spyOn(nativeElement, 'scrollIntoView');
      component.navigateToErrorElement('isHearingRelated-no');
      fixture.detectChanges();
      expect(nativeElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
      expect(nativeElement.focus).toHaveBeenCalled();
    });

    it('should set query is related error message', () => {
      component.formGroup.get('isHearingRelated').setValue(null);
      component.validateForm();
      fixture.detectChanges();
      const error = {
        title: '',
        description: RaiseQueryErrorMessage.QUERY_HEARING_RELATED,
        fieldId: 'isHearingRelated-yes'
      };
      expect(component.errorMessages).toContain(error);
    });

    it('should set enter valid date error message', () => {
      component.formGroup.get('isHearingRelated').setValue(true);
      component.validateForm();
      fixture.detectChanges();
      const error = {
        title: '',
        description: RaiseQueryErrorMessage.QUERY_HEARING_DATE,
        fieldId: 'hearingDate-day'
      };
      expect(component.errorMessages).toContain(error);
    });
  });

  describe('validateQualifyingQuestion', () => {
    it('should return true with no error message', () => {
      const qualifyingQuestion = {
        name: 'Raise a new query',
        markdown: '',
        url: `/query-management/query/123/${QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION}`
      };
      component.qualifyingQuestionsControl.setValue(qualifyingQuestion);
      component.queryCreateContext = QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS;
      expect(component.validateQualifyingQuestion()).toEqual(true);
      expect(component.qualifyingQuestionsControl.valid).toBe(true);
    });

    it('should return false with error message', () => {
      component.qualifyingQuestionsControl.setValue(null);
      component.queryCreateContext = QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS;
      expect(component.validateQualifyingQuestion()).toEqual(false);
      expect(component.qualifyingQuestionsControl.valid).toBe(false);
      expect(component.errorMessages[0]).toEqual({
        title: '',
        description: QualifyingQuestionsErrorMessage.SELECT_AN_OPTION,
        fieldId: 'qualifyingQuestionsOption'
      });
    });
  });

  describe('cancel navigation', () => {
    it('should navigate to case overview tab', () => {
      component.navigateToCaseOverviewTab();
      expect(router.navigate).toHaveBeenCalledWith(['cases', 'case-details', component.caseId],
        { fragment: 'Overview' }
      );
    });
  });

  describe('navigateToCaseOverviewTab', () => {
    it('should navigate to case overview tab', () => {
      component.navigateToCaseOverviewTab();
      expect(router.navigate).toHaveBeenCalledWith(['cases', 'case-details', component.caseId],
        { fragment: 'Overview' }
      );
    });
  });

  describe('navigateToCaseTaskTab', () => {
    it('should navigate to case tasks tab', () => {
      component.navigateToCaseTaskTab();
      expect(router.navigate).toHaveBeenCalledWith(['cases', 'case-details', component.caseId],
        { fragment: 'tasks' }
      );
    });
  });

  describe('getQueryCreateContext', () => {
    it('should return query item type respond as the query context', () => {
      activatedRoute.snapshot = {
        ...activatedRoute.snapshot,
        params: {
          ...activatedRoute.snapshot.params,
          qid: '3'
        }
      } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      expect(component.queryCreateContext).toEqual(QueryCreateContext.RESPOND);
    });

    it('should return query item type follow up as the query context', () => {
      activatedRoute.snapshot = {
        ...activatedRoute.snapshot,
        params: {
          ...activatedRoute.snapshot.params,
          qid: '4'
        }
      } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      expect(component.queryCreateContext).toEqual(QueryCreateContext.FOLLOWUP);
    });

    it('should return query item type new query qualifying question options as the query context', () => {
      component.queryCreateContext = QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_DETAIL;
      activatedRoute.snapshot = {
        ...activatedRoute.snapshot,
        params: {
          ...activatedRoute.snapshot.params,
          qid: '5'
        }
      } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      expect(component.queryCreateContext).toEqual(QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS);
    });
  });
});
