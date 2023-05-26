import pact from '@pact-foundation/pact-node';
import * as git from 'git-rev-sync';
import * as path from 'path';
import { getConfigValue } from '../../../configuration';
import {
  PACT_BRANCH_NAME,
  PACT_BROKER_PASSWORD,
  PACT_BROKER_URL,
  PACT_BROKER_USERNAME,
  PACT_CONSUMER_VERSION
} from '../../../configuration/references';

const publish = async (): Promise<void> => {
  function getPactBrokerURL() {
    return getConfigValue(PACT_BROKER_URL).includes('localhost') ? getConfigValue(PACT_BROKER_URL)
      : `https://${getConfigValue(PACT_BROKER_URL)}`;
  }

  try {
    const pactBroker = getConfigValue(PACT_BROKER_URL) ? getPactBrokerURL() : 'http://localhost:80';
    const pactTag = getConfigValue(PACT_BRANCH_NAME) ?
      getConfigValue(PACT_BRANCH_NAME) : 'Dev';

    const consumerVersion = getConfigValue(PACT_CONSUMER_VERSION) !== '' ?
      getConfigValue(PACT_CONSUMER_VERSION) : git.short();

    const opts = {
      consumerVersion,
      pactBroker,
      pactBrokerPassword: getConfigValue(PACT_BROKER_PASSWORD),
      pactBrokerUsername: getConfigValue(PACT_BROKER_USERNAME),
      pactFilesOrDirs: [
        path.resolve(__dirname, '../pacts/')
      ],
      publishVerificationResult: true,
      tags: [pactTag]
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
