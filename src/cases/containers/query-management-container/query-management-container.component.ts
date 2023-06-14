import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Document, FormDocument, QueryItemType, QueryListItem, partyMessagesMockData, QueryCreateContext } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'exui-query-management-container',
  templateUrl: './query-management-container.component.html',
  styleUrls: ['./query-management-container.component.scss']
})
export class QueryManagementContainerComponent implements OnInit {
  public queryCreateContext: QueryCreateContext = QueryCreateContext.NEW;
  public queryItem: QueryListItem | undefined;
  public showSummary: boolean = false;
  public formGroup: FormGroup = new FormGroup({});
  public submitted = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
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
      this.queryCreateContext = queryItemId === '1' ? QueryItemType.RESPOND : QueryItemType.FOLLOWUP;
    }
  }

  public showResponseForm(): void {
    this.showSummary = false;
  }

  public submitForm(): void {
    this.showSummary = true;
    this.submitted = true;
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
}
