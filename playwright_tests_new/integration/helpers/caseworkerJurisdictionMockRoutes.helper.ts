import type { Page } from '@playwright/test';

export type SupportedJurisdictionDetail = { serviceId: string; serviceName: string };

export type CaseworkerJurisdictionMock = {
  id: string;
  name: string;
  caseTypes: Array<{ id: string; name: string; states: unknown[] }>;
};

export function buildCaseworkerJurisdictionsMock(
  supportedJurisdictions: string[],
  supportedJurisdictionDetails?: SupportedJurisdictionDetail[]
): CaseworkerJurisdictionMock[] {
  const jurisdictionDetails =
    supportedJurisdictionDetails ??
    supportedJurisdictions.map((serviceId) => ({
      serviceId,
      serviceName: serviceId,
    }));

  return supportedJurisdictions.map((serviceId) => {
    const detail = jurisdictionDetails.find((item) => item.serviceId === serviceId);

    return {
      id: serviceId,
      name: detail?.serviceName ?? serviceId,
      caseTypes: [],
    };
  });
}

export async function setupCaseworkerJurisdictionsRoute(
  page: Page,
  supportedJurisdictions: unknown,
  supportedJurisdictionDetails?: SupportedJurisdictionDetail[],
  status = 200
): Promise<void> {
  const responseBody =
    Array.isArray(supportedJurisdictions) && status === 200
      ? buildCaseworkerJurisdictionsMock(supportedJurisdictions, supportedJurisdictionDetails)
      : supportedJurisdictions;

  await page.route('**/aggregated/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(responseBody),
    });
  });
}
