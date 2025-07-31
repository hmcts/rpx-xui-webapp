import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { combineLatest, Observable, Subscription, Subject } from 'rxjs';
import {
  CaseNotifier,
  CaseView,
  Document,
  FormDocument,
  QualifyingQuestionsErrorMessage,
  QueryCreateContext,
  QueryListItem,
  CasesService,
  CaseEventTrigger,
  CaseField,
  QualifyingQuestionService,
  ErrorNotifierService,
  AlertService,
  CallbackErrorsContext,
  HttpError,
  CaseQueriesCollection,
  CaseEventData,
  CaseViewTrigger,
  QmCaseQueriesCollection
} from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService, GoogleTagManagerService, LoadingService } from '@hmcts/rpx-xui-common-lib';
import { map, switchMap, take } from 'rxjs/operators';
import { ErrorMessage } from '../../../app/models';
import { CaseTypeQualifyingQuestions } from '../../models/qualifying-questions/casetype-qualifying-questions.model';
import { QualifyingQuestion } from '../../models/qualifying-questions/qualifying-question.model';
import { RaiseQueryErrorMessage } from '../../models/raise-query-error-message.enum';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app/store';
import { ServiceAttachmentHintTextResponse } from '../../models/service-message/service-message.model';
import { ServiceMessagesResponse } from '../../models/service-message/service-message.model';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'exui-query-management-container',
  templateUrl: './query-management-container.component.html',
  styleUrls: ['./query-management-container.component.scss']
})
export class QueryManagementContainerComponent implements OnInit, OnDestroy {
  private readonly LD_QUALIFYING_QUESTIONS = 'qm-qualifying-questions';
  private readonly LD_SERVICE_MESSAGE = 'qm-service-messages';
  private readonly RAISE_A_QUERY_NAME = 'Raise a new query';
  private readonly FOLLOW_UP_ON_EXISTING_QUERY = 'Follow-up on an existing query';
  public static readonly RAISE_A_QUERY_QUESTION_OPTION = 'raiseAQuery';

  private static readonly QUERY_ITEM_QUALIFYING_QUESTION_DETAIL = '1';
  private static readonly QUERY_ITEM_RESPOND = '3';
  private static readonly QUERY_ITEM_FOLLOWUP = '4';

  private readonly RAISE_A_QUERY_EVENT_TRIGGER_ID = 'queryManagementRaiseQuery';
  private readonly RESPOND_TO_QUERY_EVENT_TRIGGER_ID = 'queryManagementRespondQuery';

  private static readonly caseLevelCaseFieldId = 'CaseQueriesCollection';
  public static readonly FIELD_TYPE_COLLECTION = 'Collection';
  public static readonly FIELD_TYPE_COMPLEX = 'Complex';

  public static readonly TRIGGER_TEXT_CONTINUE = 'Ignore Warning and Continue';
  public static readonly TRIGGER_TEXT_START = 'Continue';

  public static readonly CONFIRMATION_MESSAGE_BODY = 'Our team will read your query and respond.';
  public static readonly CONFIRMATION_MESSAGE_HEAD = 'Your query has been sent to HMCTS';
  public readonly CIVIL_JURISDICTION = 'CIVIL';

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
  public eventDataError: boolean = false;
  public eventTrigger$: Observable<CaseEventTrigger>;
  public callbackConfirmationMessageText: { [key: string]: string } = {};

  public callbackConfirmationHeadeText: string;
  public attachmentHintText$: Observable<string | null>;
  public serviceMessage$: Observable<string | null>;

  public caseDetails: CaseView;
  private readonly CASE_QUERIES_COLLECTION_ID = 'CaseQueriesCollection';
  public readonly FIELD_TYPE_COMPLEX = 'Complex';
  public static readonly DISPLAY_CONTEXT_READONLY = 'READONLY';

  public eventTrigger: CaseEventTrigger;
  public eventData: CaseEventTrigger;
  public showContinueButton: boolean = true;
  private routerEventsSubscription: Subscription;
  private targetRoutePrefix = '/query-management/query/';
  public showForm: boolean;
  public jurisdictionId: string;

  public triggerTextStart = QueryManagementContainerComponent.TRIGGER_TEXT_START;
  public triggerTextIgnoreWarnings = QueryManagementContainerComponent.TRIGGER_TEXT_CONTINUE;
  public triggerText: string;
  public ignoreWarning: boolean;
  public triggerQueryDataSubmission: boolean;
  public isQueryDataValidated: boolean;

  public callbackErrorsSubject: Subject<any> = new Subject();
  public showSpinner$: Observable<boolean>;

  public caseQueriesCollections: CaseQueriesCollection[];

  public selectedQualifyingQuestion: QualifyingQuestion;

  public qmCaseQueriesCollectionData: QmCaseQueriesCollection;
  public caseData: CaseEventData;
  private caseViewTrigger: CaseViewTrigger;

  private validateCaseSubscription: Subscription;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,
    private readonly caseNotifier: CaseNotifier,
    private readonly featureToggleService: FeatureToggleService,
    private readonly casesService: CasesService,
    private readonly store: Store<fromRoot.State>,
    private readonly qualifyingQuestionService: QualifyingQuestionService,
    private readonly errorNotifierService: ErrorNotifierService,
    private readonly alertService: AlertService,
    private readonly loadingService: LoadingService,
    private googleTagManagerService: GoogleTagManagerService
  ) {}

  public ngOnInit(): void {
    this.caseId = this.activatedRoute.snapshot.params.cid;
    this.queryItemId = this.activatedRoute.snapshot.params.qid;
    this.jurisdictionId = this.activatedRoute.snapshot?.data?.case?.case_type?.jurisdiction?.id;
    this.queryCreateContext = this.getQueryCreateContext();
    this.qualifyingQuestions$ = this.getQualifyingQuestions();
    this.qualifyingQuestionsControl = new FormControl(null, Validators.required);
    this.showSpinner$ = this.loadingService.isLoading as any;
    this.serviceMessage$ = this.getServiceMessage();

    this.formGroup = new FormGroup({
      subject: new FormControl(null),
      body: new FormControl(null, Validators.required),
      isHearingRelated: new FormControl(null),
      hearingDate: new FormControl(null),
      attachments: new FormControl([] as Document[]),
      closeQuery: new FormControl(false)
    });

    if (this.queryItemId && this.queryItemId !== QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION) {
      if (this.queryCreateContext === QueryCreateContext.FOLLOWUP || this.queryCreateContext === QueryCreateContext.RESPOND) {
        this.getEventTrigger();
      }
    } else {
      this.formGroup.get('subject')?.setValidators([Validators.required]);
      this.formGroup.get('isHearingRelated')?.setValidators([Validators.required]);

      if (this.queryItemId && this.queryItemId === QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION) {
        this.getEventTrigger();
      }
    }

    this.clearSelectionOnRouteChange();
  }

  ngOnDestroy(): void {
    this.unsubscribe(this.callbackErrorsSubject);
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
    this.validateCaseSubscription?.unsubscribe();
  }

  public callbackErrorsNotify(errorContext: CallbackErrorsContext) {
    this.ignoreWarning = errorContext.ignoreWarning;
  }

  public unsubscribe(subscription: any) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  public showResponseForm(): void {
    this.showSummary = false;
    this.triggerQueryDataSubmission = false;
    // this.eventTrigger = this.eventTrigger;
  }

  public showConfirmationPage(): void {
    this.showSummary = false;
    this.showConfirmation = true;
  }

  public callbackConfirmationMessage(event: { body: string; header: string }): void {
    this.callbackConfirmationMessageText = {
      body: event?.body || QueryManagementContainerComponent.CONFIRMATION_MESSAGE_BODY,
      header: event?.header || QueryManagementContainerComponent.CONFIRMATION_MESSAGE_HEAD };
  }

  public submitForm(): void {
    if (this.queryCreateContext === QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_OPTIONS) {
      this.handleQualifyingQuestions();
    } else if (this.queryCreateContext === QueryCreateContext.NEW_QUERY_QUALIFYING_QUESTION_DETAIL) {
      // Submit triggered from the markdown page, navigate to the URL provided in the config
      this.router.navigateByUrl(this.qualifyingQuestion?.url);
    } else {
      this.processFormSubmission();
    }
  }

  private handleQualifyingQuestions(): void {
    // Validate qualifying question selection
    if (this.validateQualifyingQuestion()) {
      // Submit triggered after selecting a qualifying question from qualifying questions radio options display page
      // Display the markdown page if markdown content is available, else navigate to the URL provided in the config
      this.qualifyingQuestion = this.qualifyingQuestionsControl.value;
      this.qualifyingQuestionService.setQualifyingQuestionSelection(this.qualifyingQuestion);

      if (this.qualifyingQuestion.markdown?.length) {
        this.queryCreateContext = this.getQueryCreateContext();
        if (!this.qualifyingQuestion.url) {
          this.showContinueButton = false; //Hide Continue button when when qualifying question has no url
        }
      } else {
        this.router.navigateByUrl(this.qualifyingQuestion.url);
      }

      if (this.selectedQualifyingQuestion) {
        this.logSelection(this.selectedQualifyingQuestion);
      }
    }
  }

  private processFormSubmission(): void {
    // Show error message for follow up, new query submission
    if (this.eventDataError) {
      this.getEventTrigger();
      this.submitted = true;
      this.validateForm();
      return;
    }

    this.eventData = this.eventTrigger;
    this.submitted = true;
    this.validateForm();

    if (this.errorMessages?.length === 0 && this.eventData) {
      this.triggerQueryDataSubmission = true;
    }

    // Reset hearing date if isHearingRelated
    if (!this.formGroup.get('isHearingRelated').value) {
      this.formGroup.get('hearingDate').setValue(null);
    }
  }

  public onQueryDataCreated(data: QmCaseQueriesCollection): void {
    if (data && this.triggerQueryDataSubmission) {
      const queryData = {
        data,
        event: {
          id: this.eventData?.id,
          summary: '',
          description: this.eventData?.description
        },
        event_token: this.eventData?.event_token,
        ignore_warning: false
      };
      const validate$ = this.validate(queryData);
      this.validateCaseSubscription = validate$.subscribe({
        next: () => {
          this.showSummary= true;
          this.qmCaseQueriesCollectionData = data;
        },
        error: (error: HttpError) => {
          if (error.status !== 401 && error.status !== 403) {
            this.errorNotifierService.announceError(error);
            this.alertService.error({ phrase: error.message });
            console.error('Error occurred while fetching event data:', error);
            this.callbackErrorsSubject.next(error);
          } else {
            this.eventDataError = true;
            this.addError('Something unexpected happened. Please try again later.', 'eventDataError');
          }

          window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        }
      });
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
      this.qualifyingQuestionService.clearQualifyingQuestionSelection();
      if (!this.showContinueButton) {
        this.showContinueButton = true;
      }
    } else {
      this.location.back();

      if (this.queryCreateContext !== QueryCreateContext.NEW_QUERY) {
        this.qualifyingQuestionService.clearQualifyingQuestionSelection();
      }
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
      this.addError(RaiseQueryErrorMessage.QUERY_SUBJECT, 'subject');
    }

    if (!this.formGroup.get('body').valid) {
      const raiseQueryErrorMessage = this.queryCreateContext === QueryCreateContext.RESPOND ?
        RaiseQueryErrorMessage.RESPOND_QUERY_BODY : RaiseQueryErrorMessage.QUERY_BODY;
      this.addError(raiseQueryErrorMessage, 'body');
    }

    if (!this.formGroup.get('isHearingRelated').valid) {
      this.addError(RaiseQueryErrorMessage.QUERY_HEARING_RELATED, 'isHearingRelated-yes');
    } else {
      if (this.formGroup.get('isHearingRelated').value === true &&
        this.formGroup.get('hearingDate').value === null) {
        this.addError(RaiseQueryErrorMessage.QUERY_HEARING_DATE, 'hearingDate-day');
      }
    }
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  private addError(message: string, field: string): void {
    this.errorMessages.push({
      title: '',
      description: message,
      fieldId: field
    });
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
        const caseId = caseView.case_id;
        const placeholder = '${[CASE_REFERENCE]}';
        // Normalize caseView case_type id to uppercase
        const caseTypeKey = caseView.case_type.id.toUpperCase();

        // Build a normalised map: all keys uppercase
        const normalisedMap = {};
        Object.keys(caseTypeQualifyingQuestions).forEach((key) => {
          normalisedMap[key.toUpperCase()] = caseTypeQualifyingQuestions[key];
        });

        // Find the correct qualifying questions
        const qualifyingQuestions = (normalisedMap[caseTypeKey] ?? []).map((question) => {
          const url = question.url?.replace(placeholder, caseId);
          let markdown = question.markdown;
          if (markdown?.includes(placeholder)) {
            markdown = Utils.replaceAll(markdown, placeholder, caseId);
          }
          return { ...question, url, markdown };
        });

        // Add Extra options to qualifying question
        this.addExtraOptionsToQualifyingQuestion(qualifyingQuestions, 'Follow-up on an existing query', `/cases/case-details/${caseId}#Queries`);
        this.addExtraOptionsToQualifyingQuestion(qualifyingQuestions, this.RAISE_A_QUERY_NAME, `/query-management/query/${caseId}/${QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION}`);

        return qualifyingQuestions;
      })
    );
  }

  public getAttachmentHintText(): Observable<string | null> {
    const hintText$ = this.featureToggleService.getValue<ServiceAttachmentHintTextResponse>(
      this.LD_SERVICE_MESSAGE,
      { attachment: [] }
    );

    return combineLatest([
      this.caseNotifier.caseView,
      hintText$
    ]).pipe(
      map(([caseView, hintText]: [CaseView, ServiceAttachmentHintTextResponse]) => {
        const jurisdictionId = caseView.case_type.jurisdiction.id;
        const caseTypeId = caseView.case_type.id;
        const messages = hintText?.attachment || [];

        // Return empty string if jurisdiction is 'CIVIL' and queryCreateContext is 'RESPOND'
        if (jurisdictionId.toUpperCase() === this.CIVIL_JURISDICTION.toUpperCase() && this.queryCreateContext === QueryCreateContext.RESPOND) {
          return '';
        }

        const filteredMessages = messages.filter((msg) => {
          if (msg.jurisdiction && msg.jurisdiction !== jurisdictionId) {
            return false;
          }

          const caseTypeMatches = msg.caseType === caseTypeId;
          const onlyJurisdictionMatches = !msg.caseType && msg.jurisdiction === jurisdictionId;

          return caseTypeMatches || onlyJurisdictionMatches;
        });

        const defaultHintText = messages.filter((msg) => !msg.jurisdiction && !msg.caseType && msg.hintText);
        const relevantHintText = filteredMessages.length > 0 ? filteredMessages : defaultHintText;

        if (relevantHintText.length === 0) {
          return null;
        }

        return relevantHintText.map((msg) => msg.hintText).join('\n\n');
      })
    );
  }

  private getServiceMessage(): Observable<string | null> {
    const serviceMessages$ = this.featureToggleService.getValue<ServiceMessagesResponse>(this.LD_SERVICE_MESSAGE, { messages: [] });

    return combineLatest([
      this.caseNotifier.caseView,
      serviceMessages$
    ]).pipe(
      map(([caseView, serviceMessages]: [CaseView, ServiceMessagesResponse]) => {
        const jurisdictionId = caseView.case_type.jurisdiction.id;
        const caseTypeId = caseView.case_type.id;
        const messages = serviceMessages?.messages || [];

        const filteredMessages = messages.filter((msg) => {
          if (msg.jurisdiction && msg.jurisdiction !== jurisdictionId) {
            return false;
          }

          const caseTypeMatches = msg.caseType === caseTypeId;
          const onlyJurisdictionMatches = !msg.caseType && msg.jurisdiction === jurisdictionId;
          const isGeneric = !msg.caseType && !msg.jurisdiction;

          if (!(caseTypeMatches || onlyJurisdictionMatches || isGeneric)) {
            return false;
          }

          const pages = msg.pages?.split(',').map((page) => page.trim().toUpperCase()) || [];

          if (this.queryItemId && this.queryItemId === QueryManagementContainerComponent.RAISE_A_QUERY_QUESTION_OPTION) {
            return pages.includes('RAISE');
          }

          return false;
        });

        if (filteredMessages.length === 0) {
          return null;
        }

        const combinedMarkdown = filteredMessages
          .map((msg) => msg.markdown)
          .join('\n\n');

        return combinedMarkdown;
      })
    );
  }

  private addExtraOptionsToQualifyingQuestion(qualifyingQuestions: QualifyingQuestion[], name: string, url: string): void {
    if (!qualifyingQuestions.some((q) => q.name === name)) {
      qualifyingQuestions.push({
        name,
        markdown: '',
        url
      });
    }
  }

  public async goToQueryList(): Promise<void> {
    await this.router.navigate(['cases', 'case-details', this.caseId],
      { fragment: 'Queries' }
    );
  }

  public async navigateToCaseOverviewTab(): Promise<void> {
    await this.router.navigate(['cases', 'case-details', this.caseId],
      { fragment: 'Overview' }
    );
  }

  public async navigateToCaseTaskTab(): Promise<void> {
    await this.router.navigate(['cases', 'case-details', this.caseId, 'tasks']);
  }

  public hasRespondedToQueryTask(value: boolean): void {
    this.showContinueButton = !value;
    this.showForm = !value;
  }

  public logSelection(qualifyingQuestion: QualifyingQuestion) {
    const isQualifyingQuestions =
    this.RAISE_A_QUERY_NAME === qualifyingQuestion.name || this.FOLLOW_UP_ON_EXISTING_QUERY === qualifyingQuestion.name;

    const url = isQualifyingQuestions
      ? qualifyingQuestion.url.replace('${[CASE_REFERENCE]}', this.caseId)
      : `/query-management/query/${this.caseId}`;

    const eventParams = {
      caseTypeId: this.caseId,
      caseJurisdiction: this.jurisdictionId,
      name: qualifyingQuestion.name,
      url,
      selectionType: this.getQuestionType(qualifyingQuestion.name)
    };
    this.googleTagManagerService.event('QM_QualifyingQuestion_Selection', eventParams);
  }

  public onQuestionSelected(qualifyingQuestion: QualifyingQuestion): void {
    this.selectedQualifyingQuestion = qualifyingQuestion;
  }

  private getQuestionType(name: string): string {
    if (name === this.RAISE_A_QUERY_NAME) {
      return 'raiseNewQuery';
    }
    if (name === this.FOLLOW_UP_ON_EXISTING_QUERY) {
      return 'followUpOnExistingQuery';
    }
    return 'qualifyingQuestion';
  }

  private getEventTrigger(): void {
    const loadingToken = this.loadingService.register();

    this.caseNotifier.fetchAndRefresh(this.caseId).pipe(
      take(1),
      switchMap((caseDetails) => {
        this.caseDetails = caseDetails;

        const eventId = this.queryCreateContext !== QueryCreateContext.RESPOND
          ? this.RAISE_A_QUERY_EVENT_TRIGGER_ID
          : this.RESPOND_TO_QUERY_EVENT_TRIGGER_ID;

        this.eventTrigger$ = this.casesService.getEventTrigger(undefined, eventId, caseDetails.case_id);
        return this.eventTrigger$;
      })
    ).subscribe({
      next: (eventTrigger) => {
        this.eventTrigger = eventTrigger;
        this.showForm = true;
        this.loadingService.unregister(loadingToken);

        if ([QueryCreateContext.FOLLOWUP, QueryCreateContext.RESPOND].includes(this.queryCreateContext)) {
          this.processFilteredMessages();
        }
      },
      error: (err: HttpError) => {
        this.loadingService.unregister(loadingToken);

        if (err.status !== 401 && err.status !== 403) {
          this.errorNotifierService.announceError(err);
          this.alertService.error({ phrase: err.message });
          console.error('Error occurred while fetching event data:', err);
          this.callbackErrorsSubject.next(err);

          this.showContinueButton = false;
          this.showForm = this.ignoreWarning;
        } else {
          this.eventDataError = true;
          this.addError('Something unexpected happened. Please try again later.', 'eventDataError');
        }

        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
      }
    });
  }

  // Function to filter and process the messages based on the event data
  private processFilteredMessages():void {
    const messageId = this.activatedRoute.snapshot.params.dataid;
    let caseQueriesCollections = [];

    if (this.eventTrigger?.case_fields?.length) {
      caseQueriesCollections = this.eventTrigger.case_fields.reduce((acc, caseField) => {
        const extractedCaseQueriesFromCaseField = this.extractCaseQueriesFromCaseField(caseField);

        if (extractedCaseQueriesFromCaseField && typeof extractedCaseQueriesFromCaseField === 'object') {
          acc.push(extractedCaseQueriesFromCaseField);
        }

        return acc;
      }, []);
    }

    this.caseQueriesCollections = caseQueriesCollections;
    const allMessages = caseQueriesCollections
      .map((caseData) => caseData.caseMessages) // Extract the caseMessages arrays
      .flat();// Flatten into a single array of messages

    let filteredMessages = [];

    // Work Allocation uses the id of the query, we require the parentId to filter the messages
    if (this.queryCreateContext === QueryCreateContext.RESPOND) {
      const parentId = allMessages.find((message) => message.value.id === messageId)?.value.parentId;

      if (parentId) {
        // If parentId exists, filter messages using it
        filteredMessages = allMessages.filter((message) => message.value.id === parentId);
      } else {
        // If parentId doesn't exist, fallback to messageId
        filteredMessages = allMessages.filter((message) => message.value.id === messageId);
      }
    } else {
      // Default case: filter messages by messageId
      filteredMessages = allMessages.filter((message) => message.value.id === messageId);
    }

    if (filteredMessages.length > 0) {
      // Access matching message
      const matchingMessage = filteredMessages[0]?.value;

      if (matchingMessage) {
        this.queryItem = new QueryListItem();

        // Assign the matching message to queryItem
        Object.assign(this.queryItem, matchingMessage);
      }
    } else {
      //If queryItem shouldn't empty, and it is expected to have an id. IF it is empty then it is an error.
      console.error(`No messages found for messageId: ${messageId}`);
      this.eventDataError = true;
      this.addError('This case is not configured for query management.', 'caseNotFoundError');
    }
  }

  private extractCaseQueriesFromCaseField(caseField: CaseField) {
    const { field_type, value, display_context } = caseField;

    // Handle Complex type fields
    if (field_type.type === QueryManagementContainerComponent.FIELD_TYPE_COMPLEX) {
      if (field_type.id === QueryManagementContainerComponent.caseLevelCaseFieldId && display_context !== QueryManagementContainerComponent.DISPLAY_CONTEXT_READONLY && this.isNonEmptyObject(value)) {
        return value;
      }
      return null;
    }
  }

  private isObject(elem: any): boolean {
    return typeof elem === 'object' && elem !== null;
  }

  private isNonEmptyObject(elem: any): boolean {
    return this.isObject(elem) && Object.keys(elem).length !== 0;
  }

  private clearSelectionOnRouteChange(): void {
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Check if we navigated off the target route
        if (!event.url.startsWith(this.targetRoutePrefix)) {
          this.qualifyingQuestionService.clearQualifyingQuestionSelection();
        }
      }
    });
  }

  public validate(data): Observable<any> {
    return this.casesService.validateCase(
      this.caseDetails.case_type.id,
      data,
      this.RAISE_A_QUERY_EVENT_TRIGGER_ID) as any;
  }
}
