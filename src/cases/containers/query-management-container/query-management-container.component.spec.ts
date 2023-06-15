import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {
  FormDocument,
  QueryCreateContext,
  QueryWriteRaiseQueryComponent,
  QueryWriteRespondToQueryComponent
} from '@hmcts/ccd-case-ui-toolkit';
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

  describe('submitForm', () => {
    it('should set showSummary to true', () => {
      expect(component.showSummary).toBe(false);
      component.submitForm();
      expect(component.showSummary).toBe(true);
    });

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
      activatedRoute.snapshot = { ...activatedRoute.snapshot, params: { qid: '123' } } as unknown as ActivatedRouteSnapshot;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should set the query item', () => {
      expect(component.queryItem).toBeDefined();
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
});
