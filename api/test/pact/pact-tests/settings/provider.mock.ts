import { PactV3 } from '@pact-foundation/pact';
import * as path from 'path';
import { SpecificationVersion } from '@pact-foundation/pact/src/v3/types';

const CONSUMER_NAME = 'xui_webApp';

export interface PactTestSetupConfig {
  provider: string;
  port: number;
}

export class PactV3TestSetup {
  provider: PactV3;
  port: number;

  constructor(config: PactTestSetupConfig) {
    this.provider = new PactV3({
      consumer: CONSUMER_NAME,
      logLevel: 'info',
      provider: config.provider,
      dir: path.resolve(process.cwd(), 'api/test/pact/pacts'),
      port: this.port,
      spec: SpecificationVersion.SPECIFICATION_VERSION_V3
    });
  }
}
