import { EnvironmentConfig } from '../models/environmentConfig.model';

const iaJudgeRole: string = 'caseworker-ia-iacjudge';
const iaLegalOpsRole: string = 'caseworker-ia-caseofficer';
const testUserId: string = 'test-user-id-12345';

export const MOCK_ENVIRONMENT_CONFIG: EnvironmentConfig = {
  idamWeb: 'https://idam.example.com',
  clientId: 'xui-webapp',
  oAuthCallback: 'http://localhost:3000/oauth2/callback',
  protocol: 'http',
  oidcEnabled: 'false',
  paymentReturnUrl: 'http://localhost:3000/payment-return',
  headerConfig: {
    '.+': [],
  },
  hearingJurisdictionConfig: {
    hearingJurisdictions: {
      '.*': [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
    },
    hearingAmendment: {
      '.*': [],
    },
  },
};

export class AppTestConstants {
  public static IA_JUDGE_ROLE = iaJudgeRole;
  public static IA_LEGAL_OPS_ROLE = iaLegalOpsRole;
  public static TEST_USER_ID = testUserId;
}
