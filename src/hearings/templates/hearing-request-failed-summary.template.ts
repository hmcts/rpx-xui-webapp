import { AnswerSource } from '../models/hearings.enum';
import { Section } from '../models/section';

export const HEARING_REQUEST_FAILED_SUMMARY_TEMPLATE: Section[] = [
  {
    sectionHTMLTitle: '<h1 class="govuk-heading-l">Details of error</h1>',
    isHiddenMargin: true,
  },
  {
    sectionHTMLTitle: '',
    answers: [
      {
        id: 'dateRequestFailed',
        answerTitle: 'Error timestamp/ Time of error',
        answerSource: AnswerSource.DATE_REQUEST_FAILED,
      },
      {
        id: 'caseNumber',
        answerTitle: 'Case number',
        answerSource: AnswerSource.CASE_NUMBER,
      }
    ],
  },
];

