import nodeAppDataModels from '../../api/data/nodeAppDataModels';

export type ShareCaseUser = {
  idamId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type SharedCaseMock = {
  caseId: string;
  caseTitle: string;
  caseTypeId?: string;
  sharedWith?: ShareCaseUser[];
  pendingShares?: ShareCaseUser[];
  pendingUnshares?: ShareCaseUser[];
};

export const shareableJurisdiction = 'DIVORCE';
export const shareableCaseType = 'xuiTestJurisdiction';

export const shareCaseUsers: ShareCaseUser[] = [
  {
    idamId: 'u111111',
    firstName: 'Joe',
    lastName: 'Elliott',
    email: 'joe.elliott@woodford.example.com',
  },
  {
    idamId: 'u222222',
    firstName: 'Steve',
    lastName: 'Harrison',
    email: 'steve.harrison@woodford.example.com',
  },
  {
    idamId: 'u333333',
    firstName: 'James',
    lastName: 'Priest',
    email: 'james.priest@woodford.example.com',
  },
];

export function buildShareCaseUserDetails() {
  const userDetails = nodeAppDataModels.getUserDetails_oauth();
  userDetails.canShareCases = true;
  userDetails.userInfo.roles = Array.from(
    new Set([...(Array.isArray(userDetails.userInfo.roles) ? userDetails.userInfo.roles : []), 'caseworker-divorce'])
  );
  userDetails.roleAssignmentInfo = [
    {
      jurisdiction: shareableJurisdiction,
      isCaseAllocator: true,
      roleType: 'ORGANISATION',
      substantive: true,
    },
  ];

  return userDetails;
}

export function buildSharedCase(caseId: string, caseTitle: string = caseId): SharedCaseMock {
  return {
    caseId,
    caseTitle,
    caseTypeId: shareableCaseType,
    sharedWith: [],
    pendingShares: [],
    pendingUnshares: [],
  };
}

export function buildSharedCases(caseIds: string[]): SharedCaseMock[] {
  return caseIds.map((caseId) => buildSharedCase(caseId));
}

export function buildAssignedSharedCases(sharedCases: SharedCaseMock[]): SharedCaseMock[] {
  return sharedCases.map((sharedCase) => ({
    ...sharedCase,
    pendingShares: [],
    sharedWith: [...(sharedCase.sharedWith ?? []), ...(sharedCase.pendingShares ?? [])],
  }));
}
