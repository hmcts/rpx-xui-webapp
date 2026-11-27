import type { Page } from '@playwright/test';
import type { NocEvent } from '../../../src/noc/models/noc-event.interface';
import type { NocQuestions } from '../../../src/noc/models/noc-questions.interface';
import { mockMigrationRequest } from './migrationVisualRoutes.helper';
import {
  buildNoticeOfChangeQuestionsMock,
  buildNoticeOfChangeTimeQuestionsMock,
  NOTICE_OF_CHANGE_CASE_REFERENCE,
  NOTICE_OF_CHANGE_MISMATCH_ERROR,
} from '../mocks/noticeOfChange.mock';

export async function setupNoticeOfChangeMockRoutes(
  page: Page,
  origin: string,
  options: { questions?: NocQuestions; mismatchFirstValidation?: boolean } = {}
) {
  const requests = {
    questionReferences: [] as string[],
    validations: [] as NocEvent[],
    submissions: [] as NocEvent[],
  };
  await mockMigrationRequest(page, origin, 'GET', '/api/noc/nocQuestions', async (route) => {
    const caseId = new URL(route.request().url()).searchParams.get('caseId') ?? '';
    requests.questionReferences.push(caseId);
    await route.fulfill({
      status: caseId === NOTICE_OF_CHANGE_CASE_REFERENCE ? 200 : 400,
      json:
        caseId === NOTICE_OF_CHANGE_CASE_REFERENCE
          ? (options.questions ?? buildNoticeOfChangeQuestionsMock())
          : { code: 'invalid-synthetic-case' },
    });
  });
  await mockMigrationRequest(page, origin, 'POST', '/api/noc/validateNoCQuestions', async (route) => {
    requests.validations.push(route.request().postDataJSON());
    // The default recovery scenario rejects the first valid submission before correction.
    await route.fulfill(
      options.mismatchFirstValidation !== false && requests.validations.length === 1
        ? { status: 400, json: NOTICE_OF_CHANGE_MISMATCH_ERROR }
        : { status: 200, json: true }
    );
  });
  await mockMigrationRequest(page, origin, 'POST', '/api/noc/submitNoCEvents', async (route) => {
    requests.submissions.push(route.request().postDataJSON());
    await route.fulfill({ status: 400, json: { code: 'diagnostic-never-submits' } });
  });
  return requests;
}

export async function openNoticeOfChangeTimeQuestions(page: Page, origin: string, type: 'Time' | 'DateTime') {
  const requests = await setupNoticeOfChangeMockRoutes(page, origin, {
    questions: buildNoticeOfChangeTimeQuestionsMock(type),
    mismatchFirstValidation: false,
  });
  await page.goto('/noc');
  await page.getByLabel('Online case reference number', { exact: true }).fill(NOTICE_OF_CHANGE_CASE_REFERENCE);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  // Both versions expose this component host; only GOV.UK 6 adds a labelled fieldset.
  const field = page.locator(type === 'Time' ? 'exui-noc-time-field' : 'exui-noc-datetime-field');
  if (type === 'DateTime') {
    await field.getByLabel('Day', { exact: true }).fill('15');
    await field.getByLabel('Month', { exact: true }).fill('1');
    await field.getByLabel('Year', { exact: true }).fill('2000');
  }
  for (const part of ['Hour', 'Minute', 'Second']) {
    await field.getByLabel(part, { exact: true }).fill('0');
  }
  return { requests, field };
}
