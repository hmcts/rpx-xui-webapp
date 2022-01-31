import {AnswerSource} from '../models/hearings.enum';
import {Section} from '../models/section';

export const HEARING_CREATE_EDIT_SUMMARY_TEMPLATE: Section[] = [
  {
    sectionHTMLTitle: '<h1 class="govuk-heading-l">Check your answers before sending your request</h1>',
    sectionOrder: 1,
    answers: [
      {
        answerTitle: 'Case name',
        answerSource: AnswerSource.CASE_NAME,
        answerOrder: 1
      },
      {
        answerTitle: 'Type',
        answerSource: AnswerSource.Type,
        answerOrder: 2
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Hearing requirements</h2>',
    sectionOrder: 2,
    answers: [
      {
        answerTitle: 'Reasonable adjustments',
        answerSource: AnswerSource.CASE_FLAGS,
        answerOrder: 1,
        changeLink: '/hearings/request/hearing-requirements#linkAmendFlags',
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Additional facilities</h2>',
    sectionOrder: 3,
    answers: [
      {
        answerTitle: 'Will additional security be required?',
        answerSource: AnswerSource.ADDITIONAL_SECURITY_REQUIRED,
        answerOrder: 2,
        changeLink: '/hearings/request/hearing-facilities#additionalSecurityYes',
      },
      {
        answerTitle: 'Select any additional facilities required',
        answerSource: AnswerSource.ADDITIONAL_FACILITIES_REQUIRED,
        answerOrder: 3,
        changeLink: '/hearings/request/hearing-facilities#immigrationDetentionCentre',
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Stage</h2>',
    sectionOrder: 4,
    answers: [
      {
        answerTitle: 'What stage is this hearing at?',
        answerSource: AnswerSource.STAGE,
        answerOrder: 1,
        changeLink: '/hearings/request/hearing-stage#initial'
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
