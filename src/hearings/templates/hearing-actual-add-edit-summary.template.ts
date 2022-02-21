import {AnswerSource} from '../models/hearings.enum';
import {Section} from '../models/section';

export const HEARING_ACTUAL_ADD_EDIT_SUMMARY_TEMPLATE: Section[] = [
  {
    sectionHTMLTitle: '<span style="margin-bottom: 10px; display: block;" class="govuk-caption-l">Jane Smith vs DWP</span><h1 class="govuk-heading-l">Hearing details</h1>',
    sectionOrder: 1,
    answers: [
      {
        answerTitle: 'Hearing date',
        answerSource: AnswerSource.CASE_NAME,
        answerOrder: 1
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Hearing stage and result</h2>',
    sectionOrder: 2,
    answers: [
      {
        answerTitle: 'Hearing stage',
        answerSource: AnswerSource.CASE_FLAGS,
        answerOrder: 1,
      },
      {
        answerTitle: 'Hearing result',
        answerSource: AnswerSource.CASE_FLAGS,
        answerOrder: 2,
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Hearing timings</h2>',
    sectionOrder: 3,
    answers: [
      {
        answerTitle: 'Start time',
        answerSource: AnswerSource.ADDITIONAL_SECURITY_REQUIRED,
        answerOrder: 1,
      },
      {
        answerTitle: 'Finish time',
        answerSource: AnswerSource.ADDITIONAL_FACILITIES_REQUIRED,
        answerOrder: 2,
      },
      {
        answerTitle: 'Pause time',
        answerSource: AnswerSource.ADDITIONAL_FACILITIES_REQUIRED,
        answerOrder: 3,
      },
      {
        answerTitle: 'Resume time',
        answerSource: AnswerSource.ADDITIONAL_FACILITIES_REQUIRED,
        answerOrder: 4,
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Participants</h2>',
    sectionOrder: 4,
    answers: [
      {
        answerTitle: 'Jane Smith',
        answerSource: AnswerSource.STAGE,
        answerOrder: 1,
      },
      {
        answerTitle: 'Attendance type',
        answerSource: AnswerSource.STAGE,
        answerOrder: 1,
      },
    ],
  },
];
