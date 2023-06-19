import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import {
  CaseView,
  FormDocument,
  QueryCreateContext,
  QueryWriteRaiseQueryComponent,
  QueryWriteRespondToQueryComponent
} from '@hmcts/ccd-case-ui-toolkit';
import { QueryManagementContainerComponent } from './query-management-container.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

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
  let router: Router;
  let caseViewMock: CaseView;

  beforeEach(waitForAsync(() => {
    caseViewMock = {
      case_id: '1234567890'
    } as CaseView;
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
              data: {
                case: caseViewMock
              },
              params: {}
            }
          }
        }
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

  describe('submitForm', () => {
    it('should set submitted to true', () => {
      expect(component.submitted).toBe(false);
      component.submitForm();
      expect(component.submitted).toBe(true);
    });

    it('should reset hearing date if isHearingRelated is false', () => {
      component.formGroup.get('isHearingRelated').setValue(false);
      component.formGroup.get('hearingDate').setValue('12/12/2023');
      component.submitForm();
      expect(component.formGroup.get('hearingDate').value).toBe(null);
    });

    describe('when form is valid', () => {
      beforeEach(() => {
        // Set values so the form is valid
        component.formGroup.patchValue({
          fullName: 'Full name',
          subject: 'subject',
          body: 'body',
          isHearingRelated: true,
          hearingDate: '12/04/2024',
          attachments: []
        });
      });

      it('should set showSummary to true when there are no errorMessages', () => {
        expect(component.showSummary).toBe(false);
        component.submitForm();
        component.errorMessages = [];
        expect(component.showSummary).toBe(true);
      });
    });

    describe('when form is invalid', () => {
      it('should not set showSummary to true', () => {
        expect(component.showSummary).toBe(false);
        component.submitForm();
        expect(component.showSummary).toBe(false);
      });
    });

    describe('when it does not have a query id', () => {
      it('should not set the query item', () => {
        expect(component.queryItem).toBeUndefined();
      });

      it('should have the ccd-query-write-raise-query component', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('ccd-query-write-raise-query')).toBeTruthy();
      });
    });

    describe('when it has a query id', () => {
      beforeEach(() => {
        activatedRoute.snapshot = {
          ...activatedRoute.snapshot,
          params: { qid: '123' }
        } as unknown as ActivatedRouteSnapshot;
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should set the query item', () => {
        expect(component.queryItem).toBeDefined();
      });

      it('should set caseView', () => {
        expect(component.caseView).toEqual(caseViewMock);
      });

      it('should set the query create context to respond', () => {
        expect(component.queryCreateContext).toEqual(QueryCreateContext.RESPOND);
      });

      it('should have the ccd-query-write-respond-to-query component', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('ccd-query-write-respond-to-query')).toBeTruthy();
      });
    });

    describe('onDocumentCollectionUpdate', () => {
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
        component.submitForm();
        expect(component.submitted).toEqual(true);
        expect(component.validateForm).toHaveBeenCalled();
      });
    });

    describe('validateForm', () => {
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

    describe('navigateToCaseOverviewTab', () => {
      it('should navigate to case overview tab', () => {
        spyOn(router, 'navigate');
        component.navigateToCaseOverviewTab();
        expect(router.navigate).toHaveBeenCalledWith(['cases', 'case-details', caseViewMock.case_id], {fragment: 'Overview'});
      });
    });
  });
});
