export function generateErrorMessageWithCode(error) {
  let data
  if (error.data && !error.data.code && error.data.message) {
    const code = generateErrorCodeFromMessage(error.data.message)
    data = {...error.data, code}
  } else {
    data = error.data
  }
  return {...error, data}
}

const NoCErrorCodeMessageMap = {
  ANSWERS_EMPTY: {
    code: 'answers-empty',
    message: 'Challenge question answers can not be empty',
  },
  ANSWERS_MISMATCH_QUESTIONS: {
    code: 'answers-mismatch-questions',
    message: 'The number of provided answers must match the number of questions',
  },
  ANSWERS_NOT_IDENTIFY_LITIGANT: {
    code: 'answers-not-identify-litigant',
    message: 'The answers did not uniquely identify a litigant',
  },
  ANSWERS_NOT_MATCHED_ANY_LITIGANT: {
    code: 'answers-not-matched-any-litigant',
    message: 'The answers did not match those for any litigant',
  },
  CASE_ID_EMPTY: {
    code: 'case-id-empty',
    message: 'Case ID can not be empty',
  },
  CASE_ID_INVALID: {
    code: 'case-id-invalid',
    message: 'Case ID has to be a valid 16-digit',
  },
  CASE_ID_INVALID_LENGTH: {
    code: 'case-id-invalid-length',
    message: 'Case ID has to be 16-digits long',
  },
  CASE_NOT_FOUND: {
    code: 'case-not-found',
    message: 'Case could not be found',
  },
  GENERIC_ERROR: {
    code: 'generic-error',
    message: 'Generic error',
  },
  HAS_REPRESENTED: {
    code: 'has-represented',
    message: 'they are already representing',
  },
  INSUFFICIENT_PRIVILEGES: {
    code: 'insufficient-privileges',
    message: 'Insufficient privileges for notice of change request',
  },
  MISSING_COR_CASE_ROLE_ID: {
    code: 'missing-cor-case-role-id',
    message: 'Missing ChangeOrganisationRequest.CaseRoleID',
  },
  MULTIPLE_NOC_REQUESTS_ON_CASE: {
    code: 'multiple-noc-requests-on-case',
    message: 'More than one change request found on the case',
  },
  MULTIPLE_NOC_REQUESTS_ON_USER: {
    code: 'multiple-noc-requests-on-user',
    message: 'Multiple NoC Request events found for the user',
  },
  NOC_EVENT_UNAVAILABLE: {
    code: 'noc-event-unavailable',
    message: 'No NoC events available',
  },
  NOC_IN_PROGRESS: {
    code: 'noc-in-progress',
    message: 'Ongoing NoC request in progress',
  },
  NO_ANSWER_PROVIDED_FOR_QUESTION: {
    code: 'no-answer-provided-for-question',
    message: 'No answer has been provided for question ID',
  },
  NO_ORG_POLICY: {
    code: 'no-org-policy',
    message: 'No Organisation Policy',
  },
  NO_ORG_POLICY_CASE_ROLE: {
    code: 'no-org-policy',
    message: 'No OrganisationPolicy exists on the case for the case role',
  },
}

function generateErrorCodeFromMessage(message: string) {
  switch (true) {
    case message.includes(NoCErrorCodeMessageMap.CASE_ID_EMPTY.message):
      return NoCErrorCodeMessageMap.CASE_ID_EMPTY.code
    case message.includes(NoCErrorCodeMessageMap.CASE_ID_INVALID.message):
      return NoCErrorCodeMessageMap.CASE_ID_INVALID.code
    case message.includes(NoCErrorCodeMessageMap.CASE_ID_INVALID_LENGTH.message):
      return NoCErrorCodeMessageMap.CASE_ID_INVALID_LENGTH.code
    case message.includes(NoCErrorCodeMessageMap.CASE_NOT_FOUND.message):
      return NoCErrorCodeMessageMap.CASE_NOT_FOUND.code
    case message.includes(NoCErrorCodeMessageMap.MULTIPLE_NOC_REQUESTS_ON_USER.message):
      return NoCErrorCodeMessageMap.MULTIPLE_NOC_REQUESTS_ON_USER.code
    case message.includes(NoCErrorCodeMessageMap.MULTIPLE_NOC_REQUESTS_ON_CASE.message):
      return NoCErrorCodeMessageMap.MULTIPLE_NOC_REQUESTS_ON_CASE.code
    case message.includes(NoCErrorCodeMessageMap.INSUFFICIENT_PRIVILEGES.message):
      return NoCErrorCodeMessageMap.INSUFFICIENT_PRIVILEGES.code
    case message.includes(NoCErrorCodeMessageMap.NO_ORG_POLICY.message):
    case message.includes(NoCErrorCodeMessageMap.NO_ORG_POLICY_CASE_ROLE.message):
      return NoCErrorCodeMessageMap.NO_ORG_POLICY.code
    case message.includes(NoCErrorCodeMessageMap.NOC_EVENT_UNAVAILABLE.message):
      return NoCErrorCodeMessageMap.NOC_EVENT_UNAVAILABLE.code
    case message.includes(NoCErrorCodeMessageMap.NOC_IN_PROGRESS.message):
      return NoCErrorCodeMessageMap.NOC_IN_PROGRESS.code
    case message.includes(NoCErrorCodeMessageMap.ANSWERS_EMPTY.message):
      return NoCErrorCodeMessageMap.ANSWERS_EMPTY.code
    case message.includes(NoCErrorCodeMessageMap.ANSWERS_MISMATCH_QUESTIONS.message):
      return NoCErrorCodeMessageMap.ANSWERS_MISMATCH_QUESTIONS.code
    case message.includes(NoCErrorCodeMessageMap.ANSWERS_NOT_MATCHED_ANY_LITIGANT.message):
      return NoCErrorCodeMessageMap.ANSWERS_NOT_MATCHED_ANY_LITIGANT.code
    case message.includes(NoCErrorCodeMessageMap.ANSWERS_NOT_IDENTIFY_LITIGANT.message):
      return NoCErrorCodeMessageMap.ANSWERS_NOT_IDENTIFY_LITIGANT.code
    case message.includes(NoCErrorCodeMessageMap.NO_ANSWER_PROVIDED_FOR_QUESTION.message):
      return NoCErrorCodeMessageMap.NO_ANSWER_PROVIDED_FOR_QUESTION.code
    case message.includes(NoCErrorCodeMessageMap.HAS_REPRESENTED.message):
      return NoCErrorCodeMessageMap.HAS_REPRESENTED.code
    case message.includes(NoCErrorCodeMessageMap.MISSING_COR_CASE_ROLE_ID.message):
      return NoCErrorCodeMessageMap.MISSING_COR_CASE_ROLE_ID.code
    default:
      return NoCErrorCodeMessageMap.GENERIC_ERROR.code
  }
}
