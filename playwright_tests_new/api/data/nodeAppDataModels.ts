import { randomUUID } from 'node:crypto';

type UserDetails = {
  canShareCases: boolean;
  roleAssignmentInfo: Array<Record<string, unknown>>;
  sessionTimeout: {
    idleModalDisplayTime: number;
    pattern: string;
    totalIdleTime: number;
  };
  userInfo: Record<string, unknown>;
};

function getUserDetails_oidc(): UserDetails {
  return {
    canShareCases: false,
    roleAssignmentInfo: [
      {
        ...getUserDetailsLocationInfo(),
        caseId: '',
        caseType: '',
        roleType: 'ORGANISATION'
      }
    ],
    sessionTimeout: {
      idleModalDisplayTime: 10,
      pattern: '.',
      totalIdleTime: 480
    },
    userInfo: {
      uid: randomUUID(),
      given_name: 'XUI test',
      family_name: 'auto',
      name: 'test name',
      sub: 'juser8@mailinator.com',
      roles: [
        'caseworker',
        'caseworker-ia',
        'caseworker-ia-iacjudge'
      ],
      token: 'Bearer eyJ0eXAiOiJKV1Q',
      roleCategory: 'LEGAL_OPS',
      email: '',
      identity: '',
      iss: '',
      subname: ''
    }
  };
}

function getUserDetails_oauth(): UserDetails {
  return {
    canShareCases: false,
    roleAssignmentInfo: [getUserDetailsLocationInfo()],
    sessionTimeout: {
      idleModalDisplayTime: 10,
      pattern: '.',
      totalIdleTime: 480
    },
    userInfo: {
      id: randomUUID(),
      forename: 'XUI test',
      surname: 'Judge',
      email: 'juser8@mailinator.com',
      active: true,
      roles: [
        'caseworker',
        'caseworker-ia',
        'caseworker-ia-iacjudge'
      ],
      token: 'Bearer eyJ0eXAiOiJKV1Q',
      roleCategory: 'LEGAL_OPS'
    }
  };
}

function getUserDetailsLocationInfo(): Record<string, unknown> {
  return {
    jurisdiction: 'IA',
    isCaseAllocator: true,
    substantive: true
  };
}

const nodeAppDataModels = {
  getUserDetails_oidc,
  getUserDetails_oauth,
  getUserDetailsLocationInfo
};

export default nodeAppDataModels;
