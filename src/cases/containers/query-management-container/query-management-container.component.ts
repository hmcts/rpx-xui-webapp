import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CaseNotifier, CaseView, Document, FormDocument, QueryItemType, QueryListItem, partyMessagesMockData } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseTypeQualifyingQuestions } from '../../models/qualifying-questions/casetype-qualifying-questions.model';
import { QualifyingQuestion } from '../../models/qualifying-questions/qualifying-question.model';

@Component({
  selector: 'exui-query-management-container',
  templateUrl: './query-management-container.component.html',
  styleUrls: ['./query-management-container.component.scss']
})
export class QueryManagementContainerComponent implements OnInit, OnDestroy {
  private readonly LD_QUALIFYING_QUESTIONS = 'qm-qualifying-questions';

  public queryItem: QueryListItem | undefined;
  public showSummary: boolean = false;
  public formGroup: FormGroup = new FormGroup({});
  public submitted = false;
  public queryCreateContext: QueryItemType;
  public qualifyingQuestions$: Observable<QualifyingQuestion[]>;
  public qualifyingQuestionsSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private readonly caseNotifier: CaseNotifier,
              private readonly featureToggleService: FeatureToggleService) {}

  public ngOnInit(): void {
    const queryItemId = this.activatedRoute.snapshot.params.qid;
    if (queryItemId) {
      this.queryItem = new QueryListItem();
      Object.assign(this.queryItem, partyMessagesMockData[0].partyMessages[0]);
      this.queryCreateContext = this.getQueryCreateContext(queryItemId);
    }

    if (this.queryCreateContext === QueryItemType.NONE) {
      this.formGroup = new FormGroup({
        qualifyingQuestionOption: new FormControl(null, Validators.required)
      });
      this.qualifyingQuestions$ = this.getQualifyingQuestions();
    }

    if (this.queryCreateContext === QueryItemType.NEW) {
      this.formGroup = new FormGroup({
        fullName: new FormControl(null, Validators.required),
        subject: new FormControl(null, Validators.required),
        body: new FormControl(null, Validators.required),
        isHearingRelated: new FormControl(null, Validators.required),
        attachments: new FormControl([] as Document[])
      });
    }
  }

  public showResponseForm(): void {
    this.showSummary = false;
  }

  public submitForm(): void {
    if (this.queryCreateContext === QueryItemType.NONE) {
    }

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

  public ngOnDestroy(): void {
    this.qualifyingQuestionsSubscription?.unsubscribe();
  }

  private getQueryCreateContext(queryItemId: string): QueryItemType {
    switch (queryItemId) {
      case '1':
        return QueryItemType.NEW;
      case '2':
        return QueryItemType.RESPOND;
      case '3':
        return QueryItemType.FOLLOWUP;
      default:
        return QueryItemType.NONE;
    }
  }

  private getQualifyingQuestions(): Observable<QualifyingQuestion[]> {
    return combineLatest([
      this.caseNotifier.caseView,
      this.featureToggleService.getValue(this.LD_QUALIFYING_QUESTIONS, [])
    ]).pipe(
      map(([caseView, caseTypeQualifyingQuestions]: [CaseView, CaseTypeQualifyingQuestions[]]) => {
        console.log('CASE VIEW', caseView);
        console.log('QQ', caseTypeQualifyingQuestions);
        return caseTypeQualifyingQuestions[caseView.case_type.id];
      })
    );
  }
}
