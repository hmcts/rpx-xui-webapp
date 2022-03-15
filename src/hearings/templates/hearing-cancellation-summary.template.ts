import { AnswerSource, HearingTemplate, IsHiddenSource } from '../models/hearings.enum';
import { Section } from '../models/section';

export const HEARING_CANCELLATION_SUMMARY_TEMPLATE: Section[] = [
  {
    sectionHTMLTitle: HearingTemplate.LISTING_INFORMATION,
    isHiddenSource: IsHiddenSource.NOT_LISTED,
    isHiddenMargin: true,
  },
  {
    sectionHTMLTitle: HearingTemplate.PARTIES_TEMPLATE,
    isHiddenMargin: true,
  },
  {
    sectionHTMLTitle: '<h1 class="govuk-heading-l">Cancellation requested</h1>',
    answers: [
      {
        id: 'caseName',
        answerTitle: 'Case name',
        answerSource: AnswerSource.CASE_NAME,
      },
      {
        id: 'caseNumber',
        answerTitle: 'Case number',
        answerSource: AnswerSource.CASE_NUMBER,
      },
      {
        id: 'hearingStage',
        answerTitle: 'Hearing stage',
        answerSource: AnswerSource.STAGE,
      },
      {
        id: 'dateRequested',
        answerTitle: 'Date requested',
        answerSource: AnswerSource.DATE_REQUEST_SUBMITTED,
      },
      {
        id: 'reasonForCancellation',
        answerTitle: 'Reason for cancellation',
        answerSource: AnswerSource.REASON_FOR_CANCELLATION,
      },
    ],
  },
];

