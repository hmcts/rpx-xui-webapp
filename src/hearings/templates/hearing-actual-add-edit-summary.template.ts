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
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Attendance</h2>',
    sectionOrder: 5,
    answers: [
      {
        answerTitle: 'How will each party attend the hearing?',
        answerSource: AnswerSource.HOW_ATTENDANT,
        answerOrder: 1,
        changeLink: '/hearings/request/hearing-attendance#partyChannel0',
      },
      {
        answerTitle: 'How many people will attend the hearing in person?',
        answerSource: AnswerSource.ATTENDANT_PERSON_AMOUNT,
        answerOrder: 2,
        changeLink: '/hearings/request/hearing-attendance#attendance-number',
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Venue</h2>',
    sectionOrder: 6,
    answers: [
      {
        answerTitle: 'What are the hearing venue details?',
        answerSource: AnswerSource.VENUE,
        answerOrder: 1,
        changeLink: '/hearings/request/hearing-venue#inputLocationSearch'
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Judge details</h2>',
    sectionOrder: 7,
    answers: [
      {
        answerTitle: 'Do you want a specific judge?',
        answerSource: AnswerSource.NEED_JUDGE,
        answerOrder: 1,
        changeLink: '/hearings/request/hearing-judge#specificJudgeName',
      },
      {
        answerTitle: 'Name of the judge',
        answerSource: AnswerSource.JUDGE_NAME,
        answerOrder: 2,
        changeLink: '/hearings/request/hearing-judge#inputSelectPerson',
      },
      {
        answerTitle: 'Exclude a judge',
        answerSource: AnswerSource.JUDGE_EXCLUSION,
        answerOrder: 3,
        changeLink: '/hearings/request/hearing-judge#inputSelectPersonExclude',
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Panel details</h2>',
    sectionOrder: 8,
    answers: [
      {
        answerTitle: 'Do you require a panel for this hearing?',
        answerSource: AnswerSource.HEARING_PANEL,
        answerOrder: 1,
        changeLink: '/hearings/request/hearing-panel#specificPanelSelection'
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Length, date and priority level of hearing</h2>',
    sectionOrder: 9,
    answers: [
      {
        answerTitle: 'Length of hearing',
        answerSource: AnswerSource.HEARING_LENGTH,
        answerOrder: 1,
        changeLink: '/hearings/request/hearing-timing#durationhours',
      },
      {
        answerTitle: 'Does the hearing need to take place on a specific date?',
        answerSource: AnswerSource.HEARING_SPECIFIC_DATE,
        answerOrder: 2,
        changeLink: '/hearings/request/hearing-timing#noSpecificDate',
      },
      {
        answerTitle: 'What is the priority of this hearing?',
        answerSource: AnswerSource.HEARING_PRIORITY,
        answerOrder: 2,
        changeLink: '/hearings/request/hearing-timing#urgent',
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Additional instructions</h2>',
    sectionOrder: 10,
    answers: [
      {
        answerTitle: 'Enter any additional instructions for the hearing',
        answerSource: AnswerSource.ADDITIONAL_INSTRUCTION,
        answerOrder: 1,
        changeLink: '/hearings/request/hearing-additional-instructions#additionalInstructionsTextarea',
      },
    ],
  },
];
