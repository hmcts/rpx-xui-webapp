// Use this as a store for validation regexes, don't add expects to this file, only validation methods or constants.

export class ValidatorUtils {
  public DIVORCE_CASE_NUMBER_REGEX = /#?\d{4}-?\d{4}-?\d{4}-?\d{4}/;
  public EMPLOYMENT_CASE_NUMBER_REGEX = /(\d+\/\d+)/;

  public formatCaseNumber(caseNumber: string): string {
    if (!/^\d{16}$/.test(caseNumber)) {
      throw new Error('Case number must be 16 digits');
    }
    return caseNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  }

  public mutateCaseNumber(caseNumber: string): string {
    if (!/^\d{16}$/.test(caseNumber)) {
      throw new Error('Case number must be 16 digits');
    }
    return caseNumber.slice(0, -1) + (caseNumber.endsWith('9') ? '8' : '9');
  }
}
