import type { Page } from '@playwright/test';
import type { NocEvent } from '../../../src/noc/models/noc-event.interface';
import {
  buildNoticeOfChangeQuestionsMock,
  NOTICE_OF_CHANGE_CASE_REFERENCE,
  NOTICE_OF_CHANGE_MISMATCH_ERROR,
} from '../mocks/noticeOfChange.mock';

export async function setupNoticeOfChangeMockRoutes(page: Page) {
  const requests = {
    questionReferences: [] as string[],
    validations: [] as NocEvent[],
    submissions: [] as NocEvent[],
  };
  await page.route('**/api/noc/nocQuestions?caseId=*', async (route) => {
    const caseId = new URL(route.request().url()).searchParams.get('caseId')!;
    requests.questionReferences.push(caseId);
    await route.fulfill({
      status: caseId === NOTICE_OF_CHANGE_CASE_REFERENCE ? 200 : 400,
      json: caseId === NOTICE_OF_CHANGE_CASE_REFERENCE ? buildNoticeOfChangeQuestionsMock() : { code: 'invalid-synthetic-case' },
    });
  });
  await page.route('**/api/noc/validateNoCQuestions', async (route) => {
    requests.validations.push(route.request().postDataJSON());
    // The first valid submission fails matching; correction must then reach the review page.
    await route.fulfill(
      requests.validations.length === 1 ? { status: 400, json: NOTICE_OF_CHANGE_MISMATCH_ERROR } : { status: 200, json: true }
    );
  });
  await page.route('**/api/noc/submitNoCEvents', async (route) => {
    requests.submissions.push(route.request().postDataJSON());
    await route.fulfill({ status: 400, json: { code: 'diagnostic-never-submits' } });
  });
  return requests;
}
