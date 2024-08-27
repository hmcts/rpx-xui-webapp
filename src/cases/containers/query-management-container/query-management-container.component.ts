import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CaseNotifier,
  CaseView,
  Document,
  FormDocument,
  QualifyingQuestionsErrorMessage,
  QueryCreateContext,
  QueryListItem
} from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorMessage } from '../../../app/models';
import { caseMessagesMockData } from '../../mock/query-management.mock';
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
  private readonly RAISE_A_QUERY_NAME = 'Raise a new query';
  public static readonly RAISE_A_QUERY_QUESTION_OPTION = 'raiseAQuery';

  private static readonly QUERY_ITEM_QUALIFYING_QUESTION_DETAIL = '1';
  private static readonly QUERY_ITEM_RESPOND = '3';
  private static readonly QUERY_ITEM_FOLLOWUP = '4';

  private queryItemId: string;
  public caseId: string;
  public queryCreateContext: QueryCreateContext;
  public queryItem: QueryListItem | undefined;
  public showSummary = false;
  public showConfirmation = false;
  public formGroup: FormGroup = new FormGroup({});
  public submitted = false;
  public errorMessages: ErrorMessage[] = [];
  public queryCreateContextEnum = QueryCreateContext;
  public qualifyingQuestion: QualifyingQuestion;
  public qualifyingQuestions$: Observable<QualifyingQuestion[]>;
  public qualifyingQuestionsControl: FormControl;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,
    private readonly caseNotifier: CaseNotifier,
    private readonly featureToggleService: FeatureToggleService
  ) {}

  public ngOnInit(): void {
    this.caseId = this.activatedRoute.snapshot.params.cid;
    this.queryItemId = this.activatedRoute.snapshot.params.qid;
    this.queryCreateContext = this.getQueryCreateContext();
    this.qualifyingQuestions$ = this.getQualifyingQuestions();

    this.qualifyingQuestionsControl = new FormControl(null, Validators.required);

    this.formGroup = new FormGroup({
      subject: new FormControl(null),
      body: new FormControl(null, Validators.required),
      isHearingRelated: new FormControl(null),
      hearingDate: new FormControl(null),
      attachments: new FormControl([] as Document[])
    });

    if (this.queryItemId && this.queryItemId !== QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION) {
      this.queryItem = new QueryListItem();
      Object.assign(this.queryItem, caseMessagesMockData[0].caseMessages[0].value);
    } else {
      this.formGroup.get('subject')?.setValidators([Validators.required]);
      this.formGroup.get('isHearingRelated')?.setValidators([Validators.required]);
    }
  }

  public showResponseForm(): void {
    this.showSummary = false;
  }

  public showConfirmationPage(): void {
    this.showSummary = false;
    this.showConfirmation = true;
  }

  public submitForm(): void {
    if (this.queryCreateContext === QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS) {
      // Validate qualifying question selection
      if (this.validateQualifyingQuestion()) {
        // Submit triggered after selecting a qualifying question from qualifying questions radio options display page
        // Display the markdown page if markdown content is available, else navigate to the URL provided in the config
        this.qualifyingQuestion = this.qualifyingQuestionsControl.value;

        if (this.qualifyingQuestion.markdown?.length) {
          this.queryCreateContext = this.getQueryCreateContext();
        } else {
          this.router.navigateByUrl(this.qualifyingQuestion.url);
        }
      }
    } else if (this.queryCreateContext === QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_DETAIL) {
      // Submit triggered from the markdown page, navigate to the URL provided in the config
      this.router.navigateByUrl(this.qualifyingQuestion.url);
    } else {
      this.showSummary = true;
      this.submitted = true;
      this.validateForm();
      this.showSummary = this.errorMessages?.length === 0;
      // Reset hearing date if isHearingRelated
      if (!this.formGroup.get('isHearingRelated').value) {
        this.formGroup.get('hearingDate').setValue(null);
      }
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

  public previous(): void {
    if (this.queryCreateContext === QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_DETAIL) {
      this.queryCreateContext = QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS;
    } else {
      this.location.back();
    }
  }

  public validateQualifyingQuestion(): boolean {
    this.errorMessages = [];
    if (this.queryCreateContext === QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS) {
      this.qualifyingQuestionsControl.markAsTouched();
      if (!this.qualifyingQuestionsControl.valid) {
        this.errorMessages = [
          {
            title: '',
            description: QualifyingQuestionsErrorMessage.SELECT_AN_OPTION,
            fieldId: 'qualifyingQuestionsOption'
          }
        ];
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        return false;
      }
    }
    return true;
  }

  public validateForm(): void {
    this.errorMessages = [];

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
        description:
          this.queryCreateContext === QueryCreateContext.RESPOND ?
            RaiseQueryErrorMessage.RESPOND_QUERY_BODY : RaiseQueryErrorMessage.QUERY_BODY,
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

  private getQueryCreateContext(): QueryCreateContext {
    switch (this.queryItemId) {
      case QueryManagementContainerComponent.QUERY_ITEM_QUALIFYING_QUESTION_DETAIL:
        return QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_DETAIL;
      case QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION:
        return QueryCreateContext.NEW_QUERY;
      case QueryManagementContainerComponent.QUERY_ITEM_RESPOND:
        return QueryCreateContext.RESPOND;
      case QueryManagementContainerComponent.QUERY_ITEM_FOLLOWUP:
        return QueryCreateContext.FOLLOWUP;
      default:
        // When raise a query event is initiated, the queryItemId will be null for
        // both 'display of qualifying questions radio options' and 'display of markdown' pages
        // If the qualifying questions radio options are displayed then clicking on continue
        // must show the markdown of the selected qualifying question radio option, else just
        // display the qualifying questions radio options
        return this.queryCreateContext === QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS
          ? QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_DETAIL
          : QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS;
    }
  }

  private getQualifyingQuestions(): Observable<QualifyingQuestion[]> {
    return combineLatest([
      this.caseNotifier.caseView,
      this.featureToggleService.getValue(this.LD_QUALIFYING_QUESTIONS, [])
    ]).pipe(
      map(([caseView, caseTypeQualifyingQuestions]: [CaseView, CaseTypeQualifyingQuestions[]]) => {
        this.caseId = caseView.case_id;
        const qualifyingQuestions: QualifyingQuestion[] = caseTypeQualifyingQuestions[caseView.case_type.id];
        if (!qualifyingQuestions.map((question) => question.name).includes(this.RAISE_A_QUERY_NAME)) {
          // Add the default qualifying question to the list if not present
          qualifyingQuestions.push({
            name: this.RAISE_A_QUERY_NAME,
            markdown: '',
            url: `/query-management/query/${this.caseId}/${QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION}`
          });
        }
        return qualifyingQuestions;
      })
    );
  }

  public async goToQueryList(): Promise<void> {
    await this.router.navigate(['cases', 'case-details', this.caseId],
      { fragment: 'Queries (read-only view)' }
    );
  }

  public async navigateToCaseOverviewTab(): Promise<void> {
    await this.router.navigate(['cases', 'case-details', this.caseId],
      { fragment: 'Overview' }
    );
  }

  public async navigateToCaseTaskTab(): Promise<void> {
    await this.router.navigate(['cases', 'case-details', this.caseId],
      { fragment: 'tasks' }
    );
  }
}
