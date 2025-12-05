import { expect } from "../fixtures.js";

export class ValidatorUtils {
  /**
   * Validate a case number is made of only digits
   *
   * @param caseNumber {@link string} - the case number
   *
   */
  public DIVORCE_CASE_NUMBER_REGEX = /^#\d{4}-\d{4}-\d{4}-\d{4}$/;

  public validateDivorceCaseNumber(caseNumber: string) {
    // Matches for the Divorce case number format: #1234-5678-9012-3456
    expect(caseNumber).toMatch(this.DIVORCE_CASE_NUMBER_REGEX);
  }
}
