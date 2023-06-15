import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Document,
  FormDocument,
  partyMessagesMockData,
  QueryItemType,
  QueryListItem,
  RaiseQueryErrorMessage,
  RespondToQueryErrorMessages
} from '@hmcts/ccd-case-ui-toolkit';
import { ErrorMessage } from '../../../app/models';

@Component({
  selector: 'exui-query-management-container',
  templateUrl: './query-management-container.component.html',
  styleUrls: ['./query-management-container.component.scss']
})
export class QueryManagementContainerComponent implements OnInit {
  public queryCreateContext: QueryItemType = QueryItemType.NEW;
  public queryItem: QueryListItem | undefined;
  public showSummary: boolean = false;
  public formGroup: FormGroup = new FormGroup({});
  public submitted = false;
  public errorMessages: ErrorMessage[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      subject: new FormControl(null),
      body: new FormControl(null, Validators.required),
      isHearingRelated: new FormControl(null),
      hearingDate: new FormControl(null),
      attachments: new FormControl([] as Document[])
    });

    const queryItemId = this.activatedRoute.snapshot.params.qid;
    if (queryItemId) {
      this.queryItem = new QueryListItem();
      Object.assign(this.queryItem, partyMessagesMockData[0].partyMessages[0]);
      this.queryCreateContext = queryItemId === '1' ? QueryItemType.RESPOND : QueryItemType.FOLLOWUP;
    } else {
      (this.formGroup.get('subject') as FormControl).setValidators([Validators.required]);
      (this.formGroup.get('isHearingRelated') as FormControl).setValidators([Validators.required]);
    }
  }

  public showResponseForm(): void {
    this.showSummary = false;
  }

  public submitForm(): void {
    this.submitted = true;
    this.validateForm();
    this.showSummary = this.errorMessages?.length === 0;
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

  public validateForm(): void {
    const contextIsNew = this.queryCreateContext === QueryItemType.NEW;
    this.errorMessages = [];
    if (!this.formGroup.get('fullName').valid) {
      this.errorMessages.push({
        title: '',
        description: contextIsNew ? RaiseQueryErrorMessage.FULL_NAME : RespondToQueryErrorMessages.FULL_NAME,
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
        description: contextIsNew ? RaiseQueryErrorMessage.QUERY_BODY : RespondToQueryErrorMessages.QUERY_BODY,
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
}
