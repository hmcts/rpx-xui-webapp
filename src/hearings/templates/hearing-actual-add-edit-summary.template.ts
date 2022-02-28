import {ActualsSection} from '../models/actualsSection';
import {AnswerSource} from '../models/hearings.enum';

export const HEARING_ACTUAL_ADD_EDIT_SUMMARY_TEMPLATE: ActualsSection[] = [
  {
    sectionHTMLTitle: '<span style="margin-bottom: 10px; display: block;" class="govuk-caption-l">Jane Smith vs DWP</span><h1 class="govuk-heading-l">Hearing details</h1>',
    answers: [
      {
        id: 'caseName',
        answerTitle: 'Hearing date',
        answerSource: AnswerSource.CASE_NAME,
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Hearing stage and result</h2>',
    updateLink: 'hearing-actual/stage-and-result',
    answers: [
      {
        id: 'stage',
        answerTitle: 'Hearing stage',
        answerSource: AnswerSource.CASE_FLAGS,
      },
      {
        id: 'result',
        answerTitle: 'Hearing result',
        answerSource: AnswerSource.CASE_FLAGS,
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Hearing timings</h2>',
    updateLink: '/hearings/actuals/hearing-timing',
    answers: [
      {
        id: 'startTime',
        answerTitle: 'Start time',
        answerSource: AnswerSource.ADDITIONAL_SECURITY_REQUIRED,
      },
      {
        id: 'finishTime',
        answerTitle: 'Finish time',
        answerSource: AnswerSource.ADDITIONAL_FACILITIES_REQUIRED,
      },
      {
        id: 'pauseTime',
        answerTitle: 'Pause time',
        answerSource: AnswerSource.ADDITIONAL_FACILITIES_REQUIRED,
      },
      {
        id: 'resumeTime',
        answerTitle: 'Resume time',
        answerSource: AnswerSource.ADDITIONAL_FACILITIES_REQUIRED,
      }
    ],
  },
  {
    sectionHTMLTitle: '<h2 class="govuk-heading-m">Participants</h2>',
    updateLink: '/hearings/actuals/actuals-parties',
    parties: [
      {
        HTMLTitle: '<h2 class="govuk-heading-s">Jane Smith</h2>',
        partyChannel: 'Video - Teams',
      },
      {
        HTMLTitle: '<h2 class="govuk-heading-s">DWP</h2>',
        partyChannel: 'Video - Teams',
      },
      {
        HTMLTitle: '<h2 class="govuk-heading-s">Attendee 1</h2>',
        individualDetails: {
          title: 'Ms',
          firstName: 'Mary',
          lastName: 'Jones',
        },
        organisationDetails: {
          cftOrganisationID: '54321',
          name: 'Company D',
          organisationType: '',
        },
        partyID: '2',
        partyRole: 'Interpreter',
        partyChannel: 'Letter',
      },
      {
        HTMLTitle: '<h2 class="govuk-heading-s">Attendee 2</h2>',
        individualDetails: {
          title: 'Miss',
          firstName: 'Bob',
          lastName: 'Jones',
        },
        organisationDetails: {
          cftOrganisationID: '54321',
          name: 'Company C',
          organisationType: '',
        },
        partyID: '3',
        partyRole: 'Solicitor',
        partyChannel: 'Fax',
      },
    ],
  },
];
