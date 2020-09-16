import pact from '@pact-foundation/pact-node'
import * as fs from 'fs'
import * as git from 'git-rev-sync'
import * as path from 'path'
import * as util from 'util'
import { getConfigValue } from '../../../configuration'
import {
  PACT_BROKER_URL, PACT_CA_BUNDLE_CERT,
  PACT_CONSUMER_VERSION, PP_TEST
} from '../../../configuration/references'
import {init} from '../../../lib/tunnel'

const writeFile = util.promisify(fs.writeFile)
const unlink = util.promisify(fs.unlink)

init()

console.log('PP_TEST IS ========>>>>> ', getConfigValue(PP_TEST))

const publish = async (): Promise<void> => {
  try {

    const certPath = '/tmp/ca-bundle.crt'

    await writeFile(certPath, getConfigValue(PACT_CA_BUNDLE_CERT))

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    process.env.SSL_CERT_FILE = certPath

    const pactBroker = getConfigValue(PACT_BROKER_URL) ?
      getConfigValue(PACT_BROKER_URL) : 'https://pact-broker.platform.hmcts.net'

    const consumerVersion = getConfigValue(PACT_CONSUMER_VERSION) !== '' ?
      // @ts-ignore
      getConfigValue(PACT_CONSUMER_VERSION) : git.short()

    const opts = {
      consumerVersion,
      pactBroker,
      pactFilesOrDirs: [
        path.resolve(__dirname, '../pacts/'),
      ],
      publishVerificationResult: true,
      tags: ['xui', 'oidc', 'oauth2'],
    }

    await pact.publishPacts(opts)

    await unlink(certPath)

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
