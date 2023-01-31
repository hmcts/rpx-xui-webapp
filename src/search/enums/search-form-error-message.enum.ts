export enum SearchFormErrorMessage {
  CASE_REF = 'Enter a 16-digit HMCTS case reference number',
  EMAIL = 'Enter an email address in the correct format, like name@example.com',
  POSTCODE = 'Enter a valid postcode',
  DATE_OF_BIRTH = 'Enter a valid date of birth',
  DATE_OF_DEATH = 'Enter a valid date of death',
  DATE_COMPARISON_FAILED = 'The date of death cannot be earlier than the date of birth',
  NO_SEARCH_CRITERIA = 'Enter information in at least one field'
}
