import { expect } from 'chai';
import 'mocha';
import * as fs from 'fs';
import * as path from 'path';

describe('PCS hearings configuration', () => {
  it('should map the PCS hearings service api to its environment variable', () => {
    // given
    const configFile = path.resolve(__dirname, '../../config/custom-environment-variables.json');

    // when
    const environmentVariables = JSON.parse(fs.readFileSync(configFile, 'utf8'));

    // then
    expect(environmentVariables.services.hearings.pcs.serviceApi).to.equal('SERVICES_HEARINGS_COMPONENT_API_PCS');
  });
});
