import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMessage } from '../../../app/models/error-message.model';
import { RaiseQueryErrorMessage } from '../../models/raise-query-error-message.enum';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Document,
  FormDocument,
  QueryCreateContext,
  QueryListItem,
  partyMessagesMockData,
  CaseView
} from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'exui-query-management-container',
  templateUrl: './query-management-container.component.html',
  styleUrls: ['./query-management-container.component.scss']
})
export class QueryManagementContainerComponent implements OnInit {
  public queryCreateContext: QueryCreateContext = QueryCreateContext.NEW;
  public queryItem: QueryListItem | undefined;
  public showSummary: boolean = false;
  public formGroup: FormGroup;
  private caseId: string;
  public submitted = false;
  public errorMessages: ErrorMessage[] = [];
  public caseView: CaseView;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private location: Location
  ) { }

  public ngOnInit(): void {
    this.caseView = this.activatedRoute.snapshot.data.case as CaseView;

    this.formGroup = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
      isHearingRelated: new FormControl(null, Validators.required),
      hearingDate: new FormControl(null),
      attachments: new FormControl([] as Document[])
    });

    const queryItemId = this.activatedRoute.snapshot.params.qid;
    this.caseId = this.activatedRoute.snapshot.params.cid;
    if (queryItemId) {
      this.queryItem = new QueryListItem();
      Object.assign(this.queryItem, partyMessagesMockData[0].partyMessages[0]);
      this.queryCreateContext = queryItemId === '2' ? QueryCreateContext.FOLLOWUP: QueryCreateContext.RESPOND;
    }
  }

  public showResponseForm(): void {
    this.showSummary = false;
  }

  public submitForm(): void {
    this.submitted = true;
    this.validateForm();
    this.showSummary = this.errorMessages?.length === 0;

    // Reset hearing date if isHearingRelated
    if (!this.formGroup.get('isHearingRelated').value) {
      this.formGroup.get('hearingDate').setValue(null);
    }
  }

  public onDocumentCollectionUpdate(uploadedDocuments: FormDocument[]): void {
    const attachments: Document[] = uploadedDocuments.map(
      (document) => ({
        _links: {
          self: {
            href: document.document_url
          },
          binary: {
            href: document.document_binary_url
          }
        },
        originalDocumentName: document.document_filename
      })
    );

    this.formGroup.get('attachments').setValue(attachments);
  }

  public goToQueryList(): void {
    this.router.navigate(['cases', 'case-details', this.caseId]).then(() => {
      window.location.hash = 'Queries (read-only view)';
    });
  }

  public previous(): void {
    this.location.back();
  }

  public validateForm(): void {
    this.errorMessages = [];
    if (!this.formGroup.get('fullName').valid) {
      this.errorMessages.push({
        title: '',
        description: RaiseQueryErrorMessage.FULL_NAME,
        fieldId: 'fullName'
      });
    }
    if (!this.formGroup.get('subject').valid) {
      this.errorMessages.push({
        title: '',
        description: RaiseQueryErrorMessage.QUERY_SUBJECT,
        fieldId: 'subject'
      });
    }
    if (!this.formGroup.get('body').valid) {
      this.errorMessages.push({
        title: '',
        description: RaiseQueryErrorMessage.QUERY_BODY,
        fieldId: 'body'
      });
    }
    if (!this.formGroup.get('isHearingRelated').valid) {
      this.errorMessages.push({
        title: '',
        description: RaiseQueryErrorMessage.QUERY_HEARING_RELATED,
        fieldId: 'isHearingRelated-yes'
      });
    } else {
      if (this.formGroup.get('isHearingRelated').value === true &&
          this.formGroup.get('hearingDate').value === null) {
        this.errorMessages.push({
          title: '',
          description: RaiseQueryErrorMessage.QUERY_HEARING_DATE,
          fieldId: 'hearingDate-day'
        });
      }
    }
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  public navigateToErrorElement(elementId: string): void {
    if (elementId) {
      const htmlElement = document.getElementById(elementId);
      if (htmlElement) {
        htmlElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        htmlElement.focus();
      }
    }
  }

  public async navigateToCaseOverviewTab(): Promise<void> {
    await this.router.navigate(['cases', 'case-details', this.caseView.case_id],
      { fragment: 'Overview' }
    );
  }
}
