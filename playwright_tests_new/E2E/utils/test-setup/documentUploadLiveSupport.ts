import type { Response } from '@playwright/test';
import { getRuntimeUserCredentialEnvMapping } from '../runtimeUserCredentials';

export function assertDocumentUploadRuntimeAliasConfigured(alias: string): void {
  const mapping = getRuntimeUserCredentialEnvMapping(alias);
  if (!mapping) {
    throw new Error(`Document upload tests require runtime alias '${alias}' to be configured.`);
  }
}

export async function resolveDocumentUploadTranslatedLabel(response: Response, sourceLabel: string): Promise<string> {
  const body = (await response.json()) as {
    translations?: Record<string, { translation?: string }>;
  };
  return body.translations?.[sourceLabel]?.translation ?? sourceLabel;
}

export function createDocumentUploadUpdateEventTracker(caseNumber: string): {
  onResponse: (response: Response) => void;
  successfulPosts: () => number;
} {
  const updateEventEndpointPattern = new RegExp(`/data/cases/${caseNumber}/events(?:\\?|$)`);
  let successfulUpdateEventPosts = 0;

  return {
    onResponse: (response: Response): void => {
      if (response.request().method() !== 'POST') {
        return;
      }
      if (!updateEventEndpointPattern.test(response.url())) {
        return;
      }
      if (response.status() < 400) {
        successfulUpdateEventPosts += 1;
      }
    },
    successfulPosts: () => successfulUpdateEventPosts,
  };
}
