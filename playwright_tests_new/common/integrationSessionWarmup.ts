import { createLogger } from '@hmcts/playwright-common';
import { sessionCapture } from './sessionCapture';

const logger = createLogger({ serviceName: 'playwright-global-setup', format: 'pretty' });

type SessionCapture = typeof sessionCapture;

export async function prewarmIntegrationSessions(
  userIdentifiers: Parameters<SessionCapture>[0],
  capture: SessionCapture = sessionCapture
): Promise<void> {
  try {
    await capture(userIdentifiers);
  } catch (error) {
    logger.warn('Integration session warmup failed; live specs will capture their sessions lazily', {
      error: error instanceof Error ? error.message : String(error),
      operation: 'integration-session-warmup',
    });
  }
}
