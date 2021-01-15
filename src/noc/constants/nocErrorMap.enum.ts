import { NocHttpError } from '../models';

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
  status: 400,
  message: 'You must enter an online case reference number that exactly matches the case details'
};

export const CASE_REF_DEFAULT_LAST_ERROR: NocHttpError = {
  status: 400,
  message: 'Enter a valid online case reference'
};

export const AFFIRMATION_DEFAULT_DISAGREE_ERROR = {
  status: 430,
  message: 'You must confirm the information you have provided'
};
