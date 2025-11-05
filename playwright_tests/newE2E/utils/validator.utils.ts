import { expect } from "../fixtures";

export class ValidatorUtils {
  /**
   * Validate a case number is made of only digits
   *
   * @param caseNumber {@link string} - the case number
   *
   */
  public validateCaseNumber(caseNumber: string) {
    // TODO: There may be a specification around case numbers somewhere?
    // For now, this just validates it's only digits
    expect(caseNumber).toMatch(/^\d+$/);
  }

  /**
   * Validate the case type is only within caseTypes
   *
   * @param caseType {@link string} - the case type
   *
   */
  public validateCaseType(caseType: string) {
    const validCaseTypes = ["C100", "FL401"];
    expect(validCaseTypes.includes(caseType)).toBeTruthy();
  }

  /**
   * Validate the status is only within statuses
   *
   * @param status {@link string} - the case number
   *
   */
  public validateStatus(status: string) {
    const validStatuses = [
      "Draft",
      "Application submitted",
      "Drafft",
      "Cyflwynwyd y cais",
    ];
    expect(validStatuses.includes(status)).toBeTruthy();
  }

  /**
   * Validates a given date in the format of "18 Oct 2024"
   * and ensures the date can be parsed
   *
   * @param caseNumber {@link string} - the case number
   *
   */
  public validateDate(date: string) {
    const dateRegex =
      /^\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/;
    expect(date).toMatch(dateRegex);
    expect(Date.parse(date)).not.toBe(NaN);
  }
}
