function findTagEnd(html: string, tagStart: number): number {
  let quote: '"' | "'" | null = null;

  for (let index = tagStart; index < html.length; index++) {
    const character = html[index];

    if (quote) {
      if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
    } else if (character === '>') {
      return index;
    }
  }

  return -1;
}

/**
 * Adds the request CSP nonce to external scripts injected by the Angular build.
 * Inline script contents are copied as raw text so script-like strings in those
 * blocks cannot be mistaken for HTML tags.
 */
export function addNonceToExternalScripts(html: string, nonce: string): string {
  if (!nonce) {
    return html;
  }

  const lowerCaseHtml = html.toLowerCase();
  let cursor = 0;
  let output = '';

  while (cursor < html.length) {
    const scriptStart = lowerCaseHtml.indexOf('<script', cursor);
    if (scriptStart === -1) {
      output += html.slice(cursor);
      break;
    }

    const characterAfterName = html[scriptStart + '<script'.length];
    if (characterAfterName && !/[\s>]/.test(characterAfterName)) {
      output += html.slice(cursor, scriptStart + '<script'.length);
      cursor = scriptStart + '<script'.length;
      continue;
    }

    const openingTagEnd = findTagEnd(html, scriptStart);
    if (openingTagEnd === -1) {
      output += html.slice(cursor);
      break;
    }

    const openingTag = html.slice(scriptStart, openingTagEnd + 1);
    const isExternal = /\ssrc\s*=/i.test(openingTag);
    const alreadyHasNonce = /\snonce\s*=/i.test(openingTag);
    const noncedOpeningTag =
      isExternal && !alreadyHasNonce
        ? openingTag.replace(/^<script/i, (scriptTag) => `${scriptTag} nonce="${nonce}"`)
        : openingTag;

    output += html.slice(cursor, scriptStart) + noncedOpeningTag;

    const closingTagStart = lowerCaseHtml.indexOf('</script', openingTagEnd + 1);
    if (closingTagStart === -1) {
      cursor = openingTagEnd + 1;
      continue;
    }

    const closingTagEnd = findTagEnd(html, closingTagStart);
    if (closingTagEnd === -1) {
      output += html.slice(openingTagEnd + 1);
      break;
    }

    output += html.slice(openingTagEnd + 1, closingTagEnd + 1);
    cursor = closingTagEnd + 1;
  }

  return output;
}