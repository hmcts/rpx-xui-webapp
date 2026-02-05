// Use this as a store for validation regexes, don't add expects to this file, only validation methods or constants.

export class ValidatorUtils {
  public DIVORCE_CASE_NUMBER_REGEX = /#?\d{4}-?\d{4}-?\d{4}-?\d{4}/;
  public EMPLOYMENT_CASE_NUMBER_REGEX = /(\d+\/\d+)/;
}
