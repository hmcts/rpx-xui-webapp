import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseNotifier, CaseView, Document, FormDocument, QualifyingQuestionsErrorMessage, QueryItemType, QueryListItem, partyMessagesMockData } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorMessage } from '../../../app/models/error-message.model';
import { CaseTypeQualifyingQuestions } from '../../models/qualifying-questions/casetype-qualifying-questions.model';
import { QualifyingQuestion } from '../../models/qualifying-questions/qualifying-question.model';
import { RaiseQueryErrorMessage } from '../../models/raise-query-error-message.enum';

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
  private caseId: string;
  public submitted = false;
  public errorMessages: ErrorMessage[] = [];
  public queryCreateContext: QueryItemType;

  public qualifyingQuestions$: Observable<QualifyingQuestion[]>;
  public qualifyingQuestionsControl: FormControl;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly caseNotifier: CaseNotifier,
    private readonly featureToggleService: FeatureToggleService,
    private readonly location: Location
  ) {}

  public ngOnInit(): void {
    this.caseId = this.activatedRoute.snapshot.params.cid;

    const queryItemId = this.activatedRoute.snapshot.params.qid;
    this.queryCreateContext = this.getQueryCreateContext(queryItemId);

    if (queryItemId) {
      this.queryItem = new QueryListItem();
      Object.assign(this.queryItem, partyMessagesMockData[0].partyMessages[0]);
    }

    this.qualifyingQuestions$ = this.getQualifyingQuestions();
    this.qualifyingQuestionsControl = new FormControl(null, Validators.required);

    this.formGroup = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
      isHearingRelated: new FormControl(null, Validators.required),
      hearingDate: new FormControl(null),
      attachments: new FormControl([] as Document[])
    });

  }

  public showResponseForm(): void {
    this.showSummary = false;
  }

  public submitForm(): void {
    this.errorMessages = [];

    if (this.queryCreateContext === QueryItemType.NONE) {
      this.qualifyingQuestionsControl.markAsTouched();
      if (this.qualifyingQuestionsControl.valid) {
        // Set to Raise A Query if the user has selected the Raise A Query option (i.e. QueryItemType.NEW)
        if (this.qualifyingQuestionsControl.value === QueryItemType.NEW) {
          this.queryCreateContext = QueryItemType.NEW;
        }
      } else {
        this.errorMessages = [
          {
            title: '',
            description: QualifyingQuestionsErrorMessage.SELECT_AN_OPTION,
            fieldId: 'qualifyingQuestionOption'
          }
        ];

        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
      }
    } else {
      this.showSummary = true;
      this.submitted = true;
      this.validateForm();
      this.showSummary = this.errorMessages?.length === 0;
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

  public navigateToErrorElement(elementId: string): void {
    if (elementId) {
      const htmlElement = document.getElementById(elementId);
      if (htmlElement) {
        htmlElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        htmlElement.focus();
      }
    }
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

  private getQueryCreateContext(queryItemId: string): QueryItemType {
    if (!queryItemId) {
      return QueryItemType.NONE;
    }
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
        this.caseId = caseView.case_id;
        return caseTypeQualifyingQuestions[caseView.case_type.id];
      })
    );
  }
}
