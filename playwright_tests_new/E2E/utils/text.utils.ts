/**
 * Text helpers for comparing rendered page copy against expected values.
 */

/**
 * Collapse the whitespace Angular templates leave around interpolated values so
 * rendered text can be compared with the plain strings used in test data.
 */
export function normaliseWhitespace(value: string | null | undefined): string {
  return (value ?? '').replaceAll(/\s+/g, ' ').trim();
}
