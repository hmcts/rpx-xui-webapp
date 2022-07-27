export enum AccessReason {
  APPROVE_REQUEST = 'Approve request',
  REJECT_REQUEST = 'Reject request',
  REQUEST_MORE_INFORMATION = 'Request more information',
}

export enum SpecificAccessText {
  TITLE = 'Review specific access request',
  HINT = 'What do you want to do with this request?',
  CASE_REF = 'Case reference'
}

export enum SpecificAccessErrors {
  NO_SELECTION = 'Select an option',
  GENERIC_ERROR = 'There is a problem',
}
