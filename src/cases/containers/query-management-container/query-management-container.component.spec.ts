import { Location } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {
  CaseNotifier,
  CaseView,
  FormDocument,
  QualifyingQuestionsErrorMessage,
  QueryItemType,
  QueryWriteRaiseQueryComponent,
  QueryWriteRespondToQueryComponent
} from '@hmcts/ccd-case-ui-toolkit';
import { BehaviorSubject } from 'rxjs';
import { QueryManagementContainerComponent } from './query-management-container.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';

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
  const mockFeatureToggleService = jasmine.createSpyObj('featureToggleService', ['getValue']);

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

  describe('when it does not have a query id', () => {
    it('should not set the query item', () => {
      expect(component.queryItem).toBeUndefined();
    });

    it('should set the queryCreateContext to be query item type of none', () => {
      expect(component.queryCreateContext).toEqual(QueryItemType.NONE);
    });

    it('should have the ccd-qualifying-questions component', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('ccd-qualifying-questions')).toBeTruthy();
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

    it('should have the ccd-query-write-respond-to-query component', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('ccd-query-write-respond-to-query')).toBeTruthy();
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
      component.queryCreateContext = QueryItemType.NEW;
      component.submitForm();
      expect(component.submitted).toEqual(true);
      expect(component.validateForm).toHaveBeenCalled();
    });

    describe('queryCreateContext is QueryItemType.None', () => {
      beforeEach(() => {
        component.queryCreateContext = QueryItemType.NONE;
      });

      it('should mark control as touched', () => {
        spyOn(component.qualifyingQuestionsControl, 'markAsTouched');
        component.submitForm();
        expect(component.qualifyingQuestionsControl.markAsTouched).toHaveBeenCalled();
      });

      describe('qualifyingQuestionsControl is valid', () => {
        beforeEach(() => {
          component.qualifyingQuestionsControl.setValue(QueryItemType.NEW);
          fixture.detectChanges();
        });

        it('should set queryCreateContext to raise a new query when qualifying question value is QueryItemType.NEW', () => {
          component.submitForm();
          expect(component.queryCreateContext).toEqual(QueryItemType.NEW);
        });
      });

      describe('qualifyingQuestionsControl is not valid', () => {
        beforeEach(() => {
          component.qualifyingQuestionsControl.setValue(null);
          fixture.detectChanges();
        });

        it('should set error messages when control is empty', () => {
          component.submitForm();
          expect(component.errorMessages).toEqual([
            {
              title: '',
              description: QualifyingQuestionsErrorMessage.SELECT_AN_OPTION,
              fieldId: 'qualifyingQuestionOption'
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
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: '1' } } as unknown as ActivatedRouteSnapshot;
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

  describe('navigateToErrorElement', () => {
    beforeEach(() => {
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: '1' } } as unknown as ActivatedRouteSnapshot;
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
    it('should return query item type follow up as the query context', () => {
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: '3' } } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      expect(component.queryCreateContext).toEqual(QueryItemType.FOLLOWUP);
    });

    it('should return query item type none as the query context', () => {
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: '4' } } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      expect(component.queryCreateContext).toEqual(QueryItemType.NONE);
    });
  });
});
