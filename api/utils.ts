export function toTitleCase(serviceName: string): string {
  return serviceName.replace(/([a-zA-Z])([a-zA-Z]*)/g, (match, firstLetter, rest) => {
    return firstLetter.toUpperCase() + rest.toLowerCase();
  });
}

export function allContainOnlySafeCharacters(values: string[]): boolean {
  for (const value of values) {
    if (containsDangerousCode(value)) {
      // if one value contains dangerous characters, return false
      return false;
    }
  }
  return true;
}

/**
 * Checks if a string contains any potentially dangerous code (JavaScript, CSS, URL schemes, JSONP).
 * @param input - The input string to be checked.
 * @returns True if the string contains potentially dangerous code, otherwise false.
 */
export function containsDangerousCode(input: string): boolean {
  // Regular expressions to detect common dangerous patterns
  const jsPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|on\w+=|eval\(|new Function\(|document\.cookie|<\s*iframe.*?>.*?<\s*\//i;
  const cssPattern = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>|expression\(|url\(/i;
  const urlSchemePattern = /data:|vbscript:/i;
  const jsonPattern = /callback=|jsonp=/i;
  return jsPattern.test(input) || cssPattern.test(input) || urlSchemePattern.test(input) || jsonPattern.test(input);
}
