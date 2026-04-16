import { expect, type Locator } from '@playwright/test';
import type { CaseListPage } from '../../E2E/page-objects/pages/exui/caseList.po';
import type { CreateCasePage } from '../../E2E/page-objects/pages/exui/createCase.po';
import { welshTranslationsSmall } from '../mocks/welshLanguage';

const TRANSLATIONS_TIMEOUT = 20_000;

type TranslationExpectation = {
  locator: Locator;
  expected: string;
};

export function getWelshTranslationChecks(createCasePage: CreateCasePage, caseListPage: CaseListPage): TranslationExpectation[] {
  return [
    {
      locator: caseListPage.exuiHeader.appHeaderLink,
      expected: welshTranslationsSmall.translations['Manage Cases'].translation,
    },
    {
      locator: caseListPage.exuiHeader.languageToggle,
      expected: 'English',
    },
    {
      locator: caseListPage.exuiHeader.signOutLink,
      expected: welshTranslationsSmall.translations['Sign out'].translation,
    },
    {
      locator: createCasePage.createCaseButton,
      expected: welshTranslationsSmall.translations['Create case'].translation,
    },
    {
      locator: caseListPage.exuiFooter.copyrightLink,
      expected: welshTranslationsSmall.translations['© Crown copyright'].translation,
    },
    {
      locator: caseListPage.caseListHeading,
      expected: welshTranslationsSmall.translations['Case list'].translation,
    },
  ];
}

export function getEnglishTranslationChecks(
  createCasePage: CreateCasePage,
  caseListPage: CaseListPage
): TranslationExpectation[] {
  return [
    {
      locator: caseListPage.exuiHeader.appHeaderLink,
      expected: 'Manage Cases',
    },
    {
      locator: caseListPage.exuiHeader.languageToggle,
      expected: 'Cymraeg',
    },
    {
      locator: caseListPage.exuiHeader.signOutLink,
      expected: 'Sign out',
    },
    {
      locator: createCasePage.createCaseButton,
      expected: 'Create case',
    },
    {
      locator: caseListPage.caseListHeading,
      expected: 'Case list',
    },
  ];
}

export async function expectLanguageChecks(checks: TranslationExpectation[]): Promise<void> {
  for (const { locator, expected } of checks) {
    await expect(locator).toContainText(expected, { timeout: TRANSLATIONS_TIMEOUT });
  }
}
