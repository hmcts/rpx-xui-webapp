import pact from '@pact-foundation/pact-node'
import * as git from 'git-rev-sync'
import * as path from 'path'
import { getConfigValue } from '../../../configuration'
import {
  PACT_BROKER_PASSWORD,
  PACT_BROKER_URL,
  PACT_BROKER_USERNAME,
  PACT_CONSUMER_VERSION,
  PACT_BRANCH_NAME
} from '../../../configuration/references'

const publish = async (): Promise<void> => {
  try {

    const pactBroker = getConfigValue(PACT_BROKER_URL) ?
        getConfigValue(PACT_BROKER_URL) : 'http://localhost:80'

    const pactTag = getConfigValue(PACT_BRANCH_NAME) ?
        getConfigValue(PACT_BRANCH_NAME) : 'Dev'

    const consumerVersion = getConfigValue(PACT_CONSUMER_VERSION) !== '' ?
      // @ts-ignore
      getConfigValue(PACT_CONSUMER_VERSION) : git.short()

    const certPath = path.resolve(__dirname, "../cer/ca-bundle.crt")
    process.env.SSL_CERT_FILE = certPath

    const opts = {
      consumerVersion,
      pactBroker,
      pactBrokerPassword: getConfigValue(PACT_BROKER_PASSWORD),
      pactBrokerUsername: getConfigValue(PACT_BROKER_USERNAME),
      pactFilesOrDirs: [
        path.resolve(__dirname, '../pacts/'),
      ],
      publishVerificationResult: true,
      tags: [pactTag],
    }

    await pact.publishPacts(opts)

    console.log('Pact contract publishing complete!')
    console.log('')
    console.log(`Head over to ${pactBroker}`)
    console.log('to see your published contracts.')

  } catch (e) {
    console.log('Pact contract publishing failed: ', e)
  }
}

(async () => {
  await publish()
})()
