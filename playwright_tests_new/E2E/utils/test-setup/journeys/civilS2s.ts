import type { Page } from '@playwright/test';
import { createGuardrails, generate as generateOneTimePassword, ScureBase32Plugin } from 'otplib';

import { firstNonEmpty, resolveCivilApiRequestTimeoutMs } from './civilConfig';
import type { CivilApiConfig } from './civilTypes';

const DEFAULT_CIVIL_S2S_MICROSERVICE = 'civil_service';

export async function getCivilS2sToken(page: Page, config: CivilApiConfig): Promise<string> {
  if (config.s2sToken) {
    return config.s2sToken;
  }

  if (!config.serviceAuthProviderUrl || !config.s2sSecret) {
    throw new Error('Civil S2S token requires PW_CIVIL_S2S_TOKEN or SERVICE_AUTH_PROVIDER_API_BASE_URL/S2S_URL and S2S_SECRET.');
  }

  const leaseUrl = config.serviceAuthProviderUrl.endsWith('/lease')
    ? config.serviceAuthProviderUrl
    : `${config.serviceAuthProviderUrl}/lease`;
  const secretBytes = new ScureBase32Plugin().decode(config.s2sSecret);
  const oneTimePassword = await generateOneTimePassword({
    secret: config.s2sSecret,
    guardrails: createGuardrails({ MIN_SECRET_BYTES: secretBytes.length }),
    strategy: 'totp',
  });
  let response;
  try {
    response = await page.request.post(leaseUrl, {
      data: {
        microservice: firstNonEmpty(process.env.PW_CIVIL_S2S_MICROSERVICE) ?? DEFAULT_CIVIL_S2S_MICROSERVICE,
        oneTimePassword,
      },
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: resolveCivilApiRequestTimeoutMs(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/ENOTFOUND|getaddrinfo/i.test(message)) {
      throw new Error(
        `Civil S2S token setup cannot reach '${leaseUrl}'. ` +
          'Provide a civil_service token through PW_CIVIL_S2S_TOKEN, or run from an environment that can resolve the HMCTS internal S2S host.'
      );
    }
    throw error;
  }

  if (!response.ok()) {
    const body = await response.text().catch(() => '');
    throw new Error(`Failed to get Civil S2S token (HTTP ${response.status()}). Body='${body.slice(0, 500)}'`);
  }

  return (await response.text()).replace(/^"|"$/g, '').trim();
}
