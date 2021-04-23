export enum NoCErrorMap {
  ANSWERS_NOT_IDENTIFY_LITIGANT = 'answers-not-identify-litigant',
  HAS_REPRESENTED = 'has-represented',
  MULTIPLE_NOC_REQUESTS_ON_USER = 'multiple-noc-requests-on-user',
  MULTIPLE_NOC_REQUESTS_ON_CASE = 'multiple-noc-requests-on-case',
  NOC_EVENT_UNAVAILABLE = 'noc-event-unavailable',
  NOC_IN_PROGRESS = 'noc-in-progress',
  NO_ORG_POLICY = 'no-org-policy',
}

export const CASE_REF_DEFAULT_VALIDATION_ERROR = {
  code: 'CASE_REF_DEFAULT_VALIDATION_ERROR',
  message: 'Enter an online case reference number that exactly matches the case details'
};

export const AFFIRMATION_DEFAULT_DISAGREE_ERROR = {
  code: 'AFFIRMATION_DEFAULT_DISAGREE_ERROR',
  message: 'Tick the box to confirm all the information is accurate and matches what is written on the case'
};

export const AFFIRMATION_NOTIFY_EVERY_PARTY_ERROR = {
  code: 'AFFIRMATION_NOTIFY_EVERY_PARTY_ERROR',
  message: 'Tick the box to confirm you’ve served notice of this change on every party to the claim and on the former legal representative'
};
