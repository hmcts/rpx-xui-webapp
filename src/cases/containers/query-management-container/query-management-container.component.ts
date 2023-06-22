import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseNotifier, CaseView, Document, FormDocument, QueryItemType, QueryListItem, partyMessagesMockData } from '@hmcts/ccd-case-ui-toolkit';
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
export class QueryManagementContainerComponent implements OnInit {
  private readonly LD_QUALIFYING_QUESTIONS = 'qm-qualifying-questions';
  private caseId: string;

  public queryItem: QueryListItem | undefined;
  public queryItemType = QueryItemType;
  public showSummary: boolean = false;
  public formGroup: FormGroup = new FormGroup({});
  public submitted = false;
  public errorMessages: ErrorMessage[] = [];
  public queryCreateContext: QueryItemType;
  public qualifyingQuestion: QualifyingQuestion;
  public qualifyingQuestions$: Observable<QualifyingQuestion[]>;
  public qualifyingQuestionControl: FormControl;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly location: Location,
              private readonly caseNotifier: CaseNotifier,
              private readonly featureToggleService: FeatureToggleService) {
    // Get current navigation
    const currentNavigation = this.router.getCurrentNavigation();
    this.qualifyingQuestion = currentNavigation?.extras?.state?.qualifyingQuestion;
  }

  public ngOnInit(): void {
    this.caseId = this.activatedRoute.snapshot.params.cid;
    const queryItemId = this.activatedRoute.snapshot.params.qid;
    this.queryCreateContext = this.getQueryCreateContext(queryItemId);
    this.qualifyingQuestions$ = this.getQualifyingQuestions();

    if (queryItemId) {
      this.queryItem = new QueryListItem();
      Object.assign(this.queryItem, partyMessagesMockData[0].partyMessages[0]);
    }

    this.qualifyingQuestionControl = new FormControl(null, Validators.required);

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
    if (this.queryCreateContext === QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS) {
      console.log('FORM GROUP VALUE', this.formGroup.value);
      console.log('QQ SELECTED VALUE', this.formGroup.get('qualifyingQuestionOption').value);
      const qualifyingQuestionOption = this.formGroup.get('qualifyingQuestionOption').value;
      if (qualifyingQuestionOption.markdown?.length) {
        this.router.navigate(['query-management', 'query', `${this.caseId}`, '1'], { state: { qualifyingQuestion: this.formGroup.get('qualifyingQuestionOption').value } });
      } else {
        this.router.navigateByUrl(qualifyingQuestionOption.url);
      }
    } else if (this.queryCreateContext === QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_DETAIL) {
      this.router.navigateByUrl(this.qualifyingQuestion.url);
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

  private getQueryCreateContext(queryItemId: string): QueryItemType {
    if (!queryItemId) {
      return QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS;
    }
    switch (queryItemId) {
      case '1':
        return QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_DETAIL;
      case '2':
        return QueryItemType.NEW_QUERY;
      case '3':
        return QueryItemType.RESPOND;
      case '4':
        return QueryItemType.FOLLOWUP;
      default:
        return QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS;
    }
  }

  private getQualifyingQuestions(): Observable<QualifyingQuestion[]> {
    return combineLatest([
      this.caseNotifier.caseView,
      this.featureToggleService.getValue(this.LD_QUALIFYING_QUESTIONS, [])
    ]).pipe(
      map(([caseView, caseTypeQualifyingQuestions]: [CaseView, CaseTypeQualifyingQuestions[]]) => {
        this.caseId = caseView.case_id;
        const qualifyingQuestions = caseTypeQualifyingQuestions[caseView.case_type.id];
        qualifyingQuestions.push({
          name: 'Raise another query relating to this case',
          markdown: '',
          url: `/query-management/query/${this.caseId}/2`
        });
        return qualifyingQuestions;
      })
    );
  }
}
