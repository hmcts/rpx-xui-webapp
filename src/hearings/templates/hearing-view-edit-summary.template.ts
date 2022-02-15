import {AnswerSource, IsHiddenSource} from '../models/hearings.enum';
import {Section} from '../models/section';

export const HEARING_VIEW_EDIT_SUMMARY_TEMPLATE: Section[] = [
  {
    sectionHTMLTitle: '<h1 class="govuk-heading-l">View or edit hearing</h1>',
    answers: [
      {
        id: 'caseName',
        answerTitle: 'Case name',
        answerSource: AnswerSource.CASE_NAME,
      },
      {
        id: 'type',
        answerTitle: 'Type',
        answerSource: AnswerSource.Type,
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Hearing requirements</h2>',
    insetInfo: 'To update this request, select change in the relevant section on this page then resubmit the request.',
    answers: [
      {
        id: 'caseFlags',
        answerTitle: 'Reasonable adjustments',
        answerSource: AnswerSource.CASE_FLAGS,
        changeLink: '/hearings/request/hearing-requirements#linkAmendFlags',
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Additional facilities</h2>',
    answers: [
      {
        id: 'additionalSecurityRequired',
        answerTitle: 'Will additional security be required?',
        answerSource: AnswerSource.ADDITIONAL_SECURITY_REQUIRED,
        changeLink: '/hearings/request/hearing-facilities#additionalSecurityYes',
      },
      {
        id: 'additionalFacilitiesRequired',
        answerTitle: 'Select any additional facilities required',
        answerSource: AnswerSource.ADDITIONAL_FACILITIES_REQUIRED,
        changeLink: '/hearings/request/hearing-facilities#immigrationDetentionCentre',
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Stage</h2>',
    answers: [
      {
        id: 'stage',
        answerTitle: 'What stage is this hearing at?',
        answerSource: AnswerSource.STAGE,
        changeLink: '/hearings/request/hearing-stage#initial'
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Attendance</h2>',
    answers: [
      {
        id: 'howAttendant',
        answerTitle: 'How will each party attend the hearing?',
        answerSource: AnswerSource.HOW_ATTENDANT,
        changeLink: '/hearings/request/hearing-attendance#partyChannel0',
      },
      {
        id: 'attendantPersonAmount',
        answerTitle: 'How many people will attend the hearing in person?',
        answerSource: AnswerSource.ATTENDANT_PERSON_AMOUNT,
        changeLink: '/hearings/request/hearing-attendance#attendance-number',
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Hearing venue</h2>',
    answers: [
      {
        id: 'venue',
        answerTitle: 'What are the hearing venue details?',
        answerSource: AnswerSource.VENUE,
        changeLink: '/hearings/request/hearing-venue#inputLocationSearch'
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Language requirements</h2>',
    answers: [
      {
        id: 'needWelsh',
        answerTitle: 'Does this hearing need to be in Welsh?',
        answerSource: AnswerSource.NEED_WELSH,
        changeLink: '/hearings/request/hearing-welsh#welsh_hearing_yes'
      },
    ],
    isHiddenSource: IsHiddenSource.WELSH_LOCATION
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Judge details</h2>',
    answers: [
      {
        id: 'needJudge',
        answerTitle: 'Do you want a specific judge?',
        answerSource: AnswerSource.NEED_JUDGE,
        changeLink: '/hearings/request/hearing-judge#specificJudgeName',
      },
      {
        id: 'judgeName',
        answerTitle: 'Name of the judge',
        answerSource: AnswerSource.JUDGE_NAME,
        changeLink: '/hearings/request/hearing-judge#inputSelectPerson',
      },
      {
        id: 'judgeExclusion',
        answerTitle: 'Exclude a judge',
        answerSource: AnswerSource.JUDGE_EXCLUSION,
        changeLink: '/hearings/request/hearing-judge#inputSelectPersonExclude',
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Panel details</h2>',
    answers: [
      {
        id: 'hearingPanel',
        answerTitle: 'Do you require a panel for this hearing?',
        answerSource: AnswerSource.HEARING_PANEL,
        changeLink: '/hearings/request/hearing-panel#specificPanelSelection'
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Length, date and priority level of hearing</h2>',
    answers: [
      {
        id: 'hearingLength',
        answerTitle: 'Length of hearing',
        answerSource: AnswerSource.HEARING_LENGTH,
        changeLink: '/hearings/request/hearing-timing#durationhours',
      },
      {
        id: 'hearingSpecificDate',
        answerTitle: 'Does the hearing need to take place on a specific date?',
        answerSource: AnswerSource.HEARING_SPECIFIC_DATE,
        changeLink: '/hearings/request/hearing-timing#noSpecificDate',
      },
      {
        id: 'hearingPriority',
        answerTitle: 'What is the priority of this hearing?',
        answerSource: AnswerSource.HEARING_PRIORITY,
        changeLink: '/hearings/request/hearing-timing#urgent',
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Additional instructions</h2>',
    answers: [
      {
        id: 'additionalInstruction',
        answerTitle: 'Enter any additional instructions for the hearing',
        answerSource: AnswerSource.ADDITIONAL_INSTRUCTION,
        changeLink: '/hearings/request/hearing-additional-instructions#additionalInstructionsTextarea',
      },
    ],
  },
];

