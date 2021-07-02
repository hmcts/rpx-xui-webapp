import { Pact } from '@pact-foundation/pact'
import * as path from 'path'

export interface PactTestSetupConfig {
  provider: string
  port: number
}

export class PactTestSetup {

  provider: Pact
  port: number

  constructor(config: PactTestSetupConfig) {
    this.provider = new Pact({
      consumer: "xui_webApp",
      dir: path.resolve(process.cwd(), "api/test/pact/pacts"),
      log: path.resolve(process.cwd(), "api/test/pact/logs", `${config.provider}.log`),
      logLevel: 'info',
      pactfileWriteMode: "merge",
      port: this.port,
      provider: config.provider,
      spec: 2,
    })
  }
}
