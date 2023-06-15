import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {
  FormDocument,
  QueryItemType,
  QueryWriteRaiseQueryComponent,
  QueryWriteRespondToQueryComponent
} from '@hmcts/ccd-case-ui-toolkit';
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        QueryManagementContainerComponent,
        QueryWriteRaiseQueryComponent,
        QueryWriteRespondToQueryComponent,
        MockRpxTranslatePipe
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              data: {},
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
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('showResponseForm - should not show summary', () => {
    component.showResponseForm();
    expect(component.showSummary).toBeFalsy();
  });

  describe('when it does not have a query id', () => {
    it('should set the query create context', () => {
      expect(component.queryCreateContext).toEqual(QueryItemType.NEW);
    });

    it('should not set the query item', () => {
      expect(component.queryItem).toBeUndefined();
    });

    it('should have the ccd-query-write-raise-query component', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('ccd-query-write-raise-query')).toBeTruthy();
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
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: '123' } } as unknown as ActivatedRouteSnapshot;
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
});
