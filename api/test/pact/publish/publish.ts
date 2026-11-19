import pact from '@pact-foundation/pact-node';
import { execSync } from 'child_process';
import * as path from 'path';
import { getConfigValue } from '../../../configuration';
import {
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
  const pactBroker = getConfigValue(PACT_BROKER_URL) ? getConfigValue(PACT_BROKER_URL) : 'http://localhost:9292';
  const pactBranch =
    process.env.CHANGE_BRANCH ||
    process.env.BRANCH_NAME ||
    execSync('git branch --show-current', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();

  if (!pactBranch || pactBranch.trim() === '' || pactBranch === 'HEAD') {
    throw new Error('Could not determine the consumer Git branch for Pact publication.');
  }
  const brokerReachable = await isBrokerReachable(pactBroker);

  if (!brokerReachable) {
    throw new Error(`Pact broker is unreachable (${pactBroker}).`);
  }

  const resolveConsumerVersion = (): string => {
    const gitSha = execSync('git rev-parse --verify HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    if (!/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/i.test(gitSha)) {
      throw new Error(`Expected a full Git SHA for Pact consumer version, got: ${gitSha}`);
    }
    return gitSha;
  };

  const configuredConsumerVersion = getConfigValue(PACT_CONSUMER_VERSION);
  const consumerVersion = resolveConsumerVersion();
  if (configuredConsumerVersion && configuredConsumerVersion.trim() !== consumerVersion) {
    throw new Error('PACT_CONSUMER_VERSION must match the full Git SHA of the checked-out commit.');
  }
  const pactBrokerPassword = getConfigValue<string | null>(PACT_BROKER_PASSWORD);
  const pactBrokerUsername = getConfigValue<string | null>(PACT_BROKER_USERNAME);

  const opts = {
    consumerVersion,
    pactBroker,
    pactFilesOrDirs: [path.resolve(__dirname, '../pacts/')],
    publishVerificationResult: true,
    branch: pactBranch,
    ...(pactBrokerPassword ? { pactBrokerPassword } : {}),
    ...(pactBrokerUsername ? { pactBrokerUsername } : {}),
  };
  await pact.publishPacts(opts);
  console.log('Pact contract publishing complete!');
  console.log('');
  console.log(`Head over to ${pactBroker}`);
  console.log('to see your published contracts.');
  console.log('Pact branch is', pactBranch);
};

describe('Pact publication', function () {
  this.timeout(120_000);

  it('publishes Pact contracts to the configured broker', async () => {
    await publish();
  });
});
