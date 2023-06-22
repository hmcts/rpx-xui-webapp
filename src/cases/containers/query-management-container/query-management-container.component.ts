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
  private readonly RAISE_A_QUERY_NAME = 'Raise another query relating to this case';
  private caseId: string;
  private queryItemId: string;

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
              private readonly featureToggleService: FeatureToggleService) {}

  public ngOnInit(): void {
    this.caseId = this.activatedRoute.snapshot.params.cid;
    this.queryItemId = this.activatedRoute.snapshot.params.qid;
    this.queryCreateContext = this.getQueryCreateContext();
    this.qualifyingQuestions$ = this.getQualifyingQuestions();

    if (this.queryItemId) {
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
      // Submit triggered after selecting a qualifying question from qualifying questions radio options display page
      // Display the markdown page if markdown content is available, else navigate to the URL provided in the config
      this.qualifyingQuestion = this.qualifyingQuestionControl.value;
      if (this.qualifyingQuestion.markdown?.length) {
        this.queryCreateContext = this.getQueryCreateContext();
      } else {
        this.router.navigateByUrl(this.qualifyingQuestion.url);
      }
    } else if (this.queryCreateContext === QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_DETAIL) {
      // Submit triggered from the markdown page, navigate to the URL provided in the config
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

  private getQueryCreateContext(): QueryItemType {
    switch (this.queryItemId) {
      case '1':
        return QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_DETAIL;
      case '2':
        return QueryItemType.NEW_QUERY;
      case '3':
        return QueryItemType.RESPOND;
      case '4':
        return QueryItemType.FOLLOWUP;
      default:
        // When raise a query event is initiated, the queryItemId will be null for
        // both 'display of qualifying questions radio options' and 'display of markdown' pages
        // If the qualifying questions radio options are displayed then clicking on continue
        // must show the markdown of the selected qualifying question radio option, else just
        // display the qualifying questions radio options
        return this.queryCreateContext === QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS
          ? QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_DETAIL
          : QueryItemType.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS;
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
            name: 'Raise another query relating to this case',
            markdown: '',
            url: `/query-management/query/${this.caseId}/2`
          });
        }
        return qualifyingQuestions;
      })
    );
  }
}
