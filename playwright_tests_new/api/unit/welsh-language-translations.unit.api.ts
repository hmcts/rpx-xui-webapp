import { expect, test } from '@playwright/test';
import { welshTranslationsForPhrases, welshTranslationsSmall } from '../../integration/mocks/welshLanguage';

test('Welsh mock returns translations only for phrases in the request', () => {
  const response = welshTranslationsForPhrases(['Create case', 'A phrase without a mock translation']);

  expect(response).toEqual({
    translations: { 'Create case': welshTranslationsSmall.translations['Create case'] },
  });
  expect(welshTranslationsForPhrases(['A phrase without a mock translation'])).toEqual({ translations: {} });
});
