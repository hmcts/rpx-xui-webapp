export function allDoNotContainDangerousCharacters(values: string[]) {
  for (const value of values) {
    if (!hasNoDangerousCharacters(value)) {
      // if one value contains dangerous characters, return false
      return false;
    }
  }
  return true;
}

export function hasNoDangerousCharacters(value: string): boolean {
  // the below only checks for the characters in the string
  // return /^[^%<>^$//]+$/.test(value);
  // substring approach below preferred
  return /^(?!.*\/\*|.*\/\/|.*;|.*&|.*\?|.*<|.*\^|.*>).+$/.test(value);
}

// url may have special characters but should guard against other dangerous characters
export function urlHasNoDangerousCharacters(value: string): boolean {
  return /^(?!.*\/\*|.*;|.*<|.*\^|.*>).+$/.test(value);
}
