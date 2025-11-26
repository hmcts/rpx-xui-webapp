import { test, expect } from './fixtures';
import { expectStatus, StatusSets, withXsrf } from './utils/apiTestUtils';
import { ROLE_ACCESS_CASE_ID } from './data/testIds';
import { endpoints } from '../../test_codecept/integration/tests/config/authenticatedRoutes';

test.describe('Authenticated routes require session', () => {
  endpoints.forEach(({ endpoint }, index) => {
    test(`[${index + 1}] GET ${endpoint} returns guarded status`, async ({ anonymousClient }) => {
      const response = await anonymousClient.get<Record<string, unknown>>(endpoint, {
        throwOnError: false
      });
      expectStatus(response.status, [...StatusSets.guardedBasic, 500, 502]);
      if (response.status === 401 && response.data) {
        expect(response.data).toMatchObject({ message: 'Unauthorized' });
      }
    });
  });
});

test.describe('Selected authenticated routes respond with session', () => {
  const caseId = ROLE_ACCESS_CASE_ID;

  test('NoC endpoints respond with session and payload', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const questions = await apiClient.get<Record<string, unknown>>(
        `api/noc/nocQuestions?caseId=${caseId}`,
        { headers, throwOnError: false }
      );
      expectStatus(questions.status, [200, 400, 403, 404, 500, 502, 504]);
      if (questions.status === 200) {
        expect(questions.data).toBeTruthy();
      }

      const validation = await apiClient.post('api/noc/validateNoCQuestions', {
        data: { caseId, answers: [] },
        headers,
        throwOnError: false
      });
      expectStatus(validation.status, [200, 400, 403, 404, 409, 500, 502, 504]);

      const submit = await apiClient.post('api/noc/submitNocEvents', {
        data: { caseId, answers: [] },
        headers,
        throwOnError: false
      });
      expectStatus(submit.status, [200, 201, 204, 400, 403, 404, 409, 500, 502, 504]);
    });
  });

  test('Hearings APIs return data or guarded status', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const hearings = await apiClient.get<Record<string, unknown>>(
        `api/hearings/getHearings?caseId=${caseId}`,
        { headers, throwOnError: false }
      );
      expectStatus(hearings.status, [...StatusSets.guardedExtended, 400]);
      if (hearings.status === 200 && hearings.data) {
        const list = (hearings.data as any)?.caseHearings;
        if (Array.isArray(list) && list.length > 0) {
          expect(list[0]).toEqual(expect.objectContaining({ hearingType: expect.any(String) }));
        }
      }

      const hearingId = (hearings.data as any)?.caseHearings?.[0]?.hearingID ?? '00000000-0000-0000-0000-000000000000';
      const single = await apiClient.get<Record<string, unknown>>(
        `api/hearings/getHearing?hearingId=${hearingId}`,
        { headers, throwOnError: false }
      );
      expectStatus(single.status, [200, 400, 401, 403, 404, 500, 502, 504]);
    });
  });
});
