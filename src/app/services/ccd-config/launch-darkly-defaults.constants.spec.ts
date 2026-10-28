import { LaunchDarklyDefaultsConstants } from './launch-darkly-defaults.constants';
import { DeploymentEnvironmentEnum } from '../../enums/deployment-environment-enum';
import { WAFeatureConfig } from '../../../work-allocation/models/common/service-config.model';

describe('LaunchDarklyDefaultsConstants', () => {
  it('should return the production data for the prod environment', () => {
    const def = LaunchDarklyDefaultsConstants.getWaServiceConfig(DeploymentEnvironmentEnum.PROD);
    expect(def).toBe(LaunchDarklyDefaultsConstants.waServiceConfigProd);
  });

  it('should return the test data for the AAT environment', () => {
    const def = LaunchDarklyDefaultsConstants.getWaServiceConfig(DeploymentEnvironmentEnum.AAT);
    expect(def).toBe(LaunchDarklyDefaultsConstants.waServiceConfigTest);
  });

  it('should enable WA only for Financial Remedy Consented in non-prod configs', () => {
    const divorceCaseTypes = (config: WAFeatureConfig) =>
      config.configurations?.find((entry) => entry.serviceName === 'DIVORCE' && entry.caseTypes.includes('FinancialRemedyMVP2'))
        ?.caseTypes;

    expect(divorceCaseTypes(LaunchDarklyDefaultsConstants.waServiceConfigTest)).toEqual(['FinancialRemedyMVP2']);
    expect(divorceCaseTypes(LaunchDarklyDefaultsConstants.waServiceConfigTestQm)).toEqual(['FinancialRemedyMVP2']);
  });
});
