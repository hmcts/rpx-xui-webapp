export function toTitleCase(serviceName: string): string {
  return serviceName.replace(/([a-zA-Z])([a-zA-Z]*)/g, (match, firstLetter, rest) => {
    return firstLetter.toUpperCase() + rest.toLowerCase();
  });
}

export function allContainOnlySafeCharacters(values: string[]) {
  for (const value of values) {
    if (hasUnacceptableCharacters(value)) {
      // if one value contains dangerous characters, return false
      return false;
    }
  }
  return true;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function hasUnacceptableCharacters(value: string): boolean {
  // ensures no characters that could be used for security attacks are present
  // the below only checks for the characters in the string
  // return /^[^%<>^$//]+$/.test(value);
  // substring approach below preferred

  // todo: verify which characters are never possible and shouldn't be permitted
  // original implementation below includes '&' for example, which is valid in organisation names
  // return !(/^(?!.*\/\*|.*\/\/|.*;|.*&|.*\?|.*<|.*\^|.*>).+$/.test(value));
  return false;
}

/**
 * Checks if a string contains only acceptable characters to defend against XSS attacks.
 * @param input - The input string to be checked.
 * @returns The sanitized string with only acceptable characters.
 */
function whitelistInput(input: string): string {
  // Define a whitelist of acceptable characters (alphanumeric and some punctuation)
  const whitelist = /[a-zA-Z0-9 .,!?@#%&()\-_=+]/g;
  
  // Replace any character not in the whitelist with an empty string
  // TODO: Convert to HTML entities
  return input.replace(whitelist, '');

  // the problem with this is that we cannot confirm which characters will appear
}

function blacklistInput(input: string): string {
  // Define a mapping of dangerous characters to their HTML entities
  const dangerousChars: { [key: string]: string } = {
    '<': '&lt;',
    '>': '&gt;',
    '{': '&#123;',
    '}': '&#125;',
    '\\': '&#92;',
    '*/': '&#42;&#47;',
  };

  // Replace dangerous characters with their HTML entities
  return input.replace(/[<>{}[\]\/\\^`;]/g, (char) => dangerousChars[char] || char);
}

// url may have special characters but should guard against other dangerous characters
export function urlHasUnacceptableCharacters(value: string): boolean {
  return !(/^(?!.*\/\*|.*;|.*<|.*\^|.*>).+$/.test(value));
}

/**
 * Checks if a string contains any potentially dangerous code (JavaScript, CSS, URL schemes, JSONP).
 * @param input - The input string to be checked.
 * @returns True if the string contains potentially dangerous code, otherwise false.
 */
export function containsDangerousCode(input: string): boolean {
  // Regular expressions to detect common dangerous patterns
  const jsPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|on\w+=|eval\(|new Function\(/i;
  const cssPattern = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>|expression\(|url\(/i;
  const urlSchemePattern = /data:|vbscript:/i;
  const jsonpPattern = /callback=|jsonp=/i;

  return jsPattern.test(input) || cssPattern.test(input) || urlSchemePattern.test(input) || jsonpPattern.test(input);
}
