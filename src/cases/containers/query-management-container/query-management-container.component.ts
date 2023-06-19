import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public submitted = false;
  public caseView: CaseView;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.caseView = this.activatedRoute.snapshot.data.case as CaseView

    this.formGroup = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
      isHearingRelated: new FormControl(null, Validators.required),
      hearingDate: new FormControl(null),
      attachments: new FormControl([] as Document[])
    });

    const queryItemId = this.activatedRoute.snapshot.params.qid;
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
    this.showSummary = true;
    this.submitted = true;
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

  public async navigateToCaseOverviewTab(): Promise<void> {
    await this.router.navigate(['cases', 'case-details', this.caseView.case_id],
      { fragment: 'Overview' }
    );
  }
}
