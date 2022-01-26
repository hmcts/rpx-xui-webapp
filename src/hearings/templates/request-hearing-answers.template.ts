import {Section} from '../models/section';

export const requestHearingAnswersTemplate: Section[] = [
  {
    sectionHTMLTitle: '<h1 class="govuk-heading-l">Check your answers before sending your request</h1>',
    sectionOrder: 1,
    answers: [
      {
        answerTitle: 'Case name',
        answerSource: 'CASE_NAME',
        answerOrder: 1
      },
      {
        answerTitle: 'Type',
        answerSource: 'TYPE',
        answerOrder: 2
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Requirements and facilities</h2>',
    sectionOrder: 2,
    answers: [
      {
        answerTitle: 'Hearing requirements',
        answerSource: 'CASE_FLAGS',
        answerOrder: 1,
        changeLink: '/hearing-requirement'
      },
      {
        answerTitle: 'Will additional security be required?',
        answerSource: 'ADDITIONAL_SECURITY_REQUIRED',
        answerOrder: 2,
        changeLink: '/hearing-facilities#radioRequired'
      },
      {
        answerTitle: 'Select any additional facilities required',
        answerSource: 'ADDITIONAL_FACILITIES_REQUIRED',
        answerOrder: 3,
        changeLink: '/hearing-facilities#checkboxRequired'
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Stage</h2>',
    sectionOrder: 3,
    answers: [
      {
        answerTitle: 'What stage is this hearing at?',
        answerSource: 'STAGE',
        answerOrder: 1,
        changeLink: '/hearing-stage'
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Attendance</h2>',
    sectionOrder: 4,
    answers: [
      {
        answerTitle: 'How will each party attend the hearing?',
        answerSource: 'HOW_ATTENDANT',
        answerOrder: 1,
        changeLink: '/hearing-attendance#attendance'
      },
      {
        answerTitle: 'How many people will attend the hearing in person?',
        answerSource: 'ATTENDANT_PERSON_AMOUNT',
        answerOrder: 2,
        changeLink: '/hearing-attendance#personAmount'
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Venue</h2>',
    sectionOrder: 5,
    answers: [
      {
        answerTitle: 'What are the hearing venue details?',
        answerSource: 'VENUE',
        answerOrder: 1,
        changeLink: '/hearing-venue'
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Judge details</h2>',
    sectionOrder: 6,
    answers: [
      {
        answerTitle: 'Do you want a specific judge?',
        answerSource: 'NEED_JUDGE',
        answerOrder: 1,
        changeLink: '/hearing-judge#radioJudgeNeeded'
      },
      {
        answerTitle: 'Name of the judge',
        answerSource: 'JUDGE_NAME',
        answerOrder: 2,
        changeLink: '/hearing-judge#inputJudge'
      },
      {
        answerTitle: 'Exclude a judge',
        answerSource: 'JUDGE_EXCLUSION',
        answerOrder: 3,
        changeLink: '/hearing-judge#excludeJudges'
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Panel details</h2>',
    sectionOrder: 7,
    answers: [
      {
        answerTitle: 'Do you require a panel for this hearing?',
        answerSource: 'HEARING_PANEL',
        answerOrder: 1,
        changeLink: '/hearing-panel'
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Length, date and priority level of hearing</h2>',
    sectionOrder: 8,
    answers: [
      {
        answerTitle: 'Length of hearing',
        answerSource: 'HEARING_LENGTH',
        answerOrder: 1,
        changeLink: '/hearing-timing#length'
      },
      {
        answerTitle: 'Does the hearing need to take place on a specific date?',
        answerSource: 'HEARING_SPECIFIC_DATE',
        answerOrder: 2,
        changeLink: '/hearing-timing#radioSpecificDate'
      },
      {
        answerTitle: 'What is the priority of this hearing?',
        answerSource: 'HEARING_PRIORITY',
        answerOrder: 2,
        changeLink: '/hearing-timing#radioPriority'
      },
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Additional instructions</h2>',
    sectionOrder: 9,
    answers: [
      {
        answerTitle: 'Enter any additional instructions for the hearing',
        answerSource: 'ADDITIONAL_INSTRUCTION',
        answerOrder: 1,
        changeLink: '/hearing-additional-instructions'
      },
    ],
  },
];
