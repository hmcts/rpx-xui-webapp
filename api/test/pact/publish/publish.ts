import pact from '@pact-foundation/pact-node';
import * as git from 'git-rev-sync';
import * as path from 'path';
import { getConfigValue } from '../../../configuration';
import {
  PACT_BRANCH_NAME,
  PACT_BROKER_PASSWORD,
  PACT_BROKER_URL,
  PACT_BROKER_USERNAME,
  PACT_CONSUMER_VERSION,
} from '../../../configuration/references';

const isBrokerReachable = async (brokerUrl: string): Promise<boolean> => {
  try {
    const url = new URL(brokerUrl);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    try {
      await fetch(url.toString(), { method: 'HEAD', signal: controller.signal });
      return true;
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    return false;
  }
};

const publish = async (): Promise<void> => {
  try {
    const pactBroker = getConfigValue(PACT_BROKER_URL) ? getConfigValue(PACT_BROKER_URL) : 'http://localhost:80';
    const pactTag = getConfigValue(PACT_BRANCH_NAME) ? getConfigValue(PACT_BRANCH_NAME) : 'Dev';
    const brokerReachable = await isBrokerReachable(pactBroker);

    if (!brokerReachable) {
      console.log(`Pact broker is unreachable (${pactBroker}). Skipping publish.`);
      return;
    }

    const resolveConsumerVersion = (): string => {
      try {
        return git.short();
      } catch {
        const envSha = process.env.GIT_COMMIT || process.env.CI_COMMIT_SHA || process.env.BUILD_VCS_NUMBER;
        if (envSha && envSha.trim()) {
          return envSha.trim().slice(0, 12);
        }
        return `local-${new Date().toISOString().replace(/[:.]/g, '-')}`;
      }
    };

    const configuredConsumerVersion = getConfigValue(PACT_CONSUMER_VERSION);
    const consumerVersion =
      configuredConsumerVersion && configuredConsumerVersion.trim() !== '' ? configuredConsumerVersion : resolveConsumerVersion();

    const opts = {
      consumerVersion,
      pactBroker,
      pactBrokerPassword: getConfigValue(PACT_BROKER_PASSWORD),
      pactBrokerUsername: getConfigValue(PACT_BROKER_USERNAME),
      pactFilesOrDirs: [path.resolve(__dirname, '../pacts/')],
      publishVerificationResult: true,
      tags: [pactTag],
    };
    await pact.publishPacts(opts);
    console.log('Pact contract publishing complete!');
    console.log('');
    console.log(`Head over to ${pactBroker}`);
    console.log('to see your published contracts.');
    console.log('Pact branchName is', pactTag);
  } catch (e) {
    console.log('Pact contract publishing failed: ', e);
  }
};

(async () => {
  await publish();
})();
