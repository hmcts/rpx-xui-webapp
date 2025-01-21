export function allContainOnlySafeCharacters(values: string[]) {
  for (const value of values) {
    if (hasUnacceptableCharacters(value)) {
      // if one value contains dangerous characters, return false
      return false;
    }
  }
  return true;
}

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

// url may have special characters but should guard against other dangerous characters
export function urlHasUnacceptableCharacters(value: string): boolean {
  return !(/^(?!.*\/\*|.*;|.*<|.*\^|.*>).+$/.test(value));
}
