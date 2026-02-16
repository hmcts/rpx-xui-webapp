/**
 * Format a case number by inserting dashes every 4 digits.
 *
 * Examples:
 *  - "1771235201345649" -> "1771-2352-0134-5649"
 *  - "1771 2352 0134 5649" -> "1771-2352-0134-5649"
 *  - "1771-2352-0134-5649" -> "1771-2352-0134-5649"
 */
export function formatCaseNumberWithDashes(input: string): string {
  if (!input) return input;
  const digits = String(input).replace(/\D/g, '');
  if (!digits) return '';
  const groups = digits.match(/.{1,4}/g) || [];
  return groups.join('-');
}

export class ValidatorUtils {
  public DIVORCE_CASE_NUMBER_REGEX = /#?\d{4}-?\d{4}-?\d{4}-?\d{4}/;
  public EMPLOYMENT_CASE_NUMBER_REGEX = /(\d+\/\d+)/;
}
