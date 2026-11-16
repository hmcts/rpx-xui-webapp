import { buildCaseListMock } from './caseList.mock';
import nodeAppDataModels from '../../api/data/nodeAppDataModels';

export type ShareCaseUser = {
  idamId: string;
  firstName: string;
  lastName: string;
  email: string;
  caseRoles?: string[];
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

// Synthetic case-role identities match the caseshare DTO; no live grants are exercised.
export const existingShareRecipient = { ...shareCaseUsers[1], caseRoles: ['[CREATOR]', '[SOLICITOR]'] };
export const retainedShareRecipient = { ...shareCaseUsers[2], caseRoles: ['[CREATOR]'] };
export const shareCaseInitialCases: SharedCaseMock[] = [
  { ...buildSharedCase('1111222233334444', 'Sharing case Alpha'), sharedWith: [retainedShareRecipient, existingShareRecipient] },
  { ...buildSharedCase('5555666677778888', 'Sharing case Beta'), sharedWith: [retainedShareRecipient] },
  { ...buildSharedCase('9999000011112222', 'Unselected case Gamma'), sharedWith: [existingShareRecipient] },
];
export const shareCaseAdditionRequest = {
  sharedCases: shareCaseInitialCases.slice(0, 2).map((aCase) => ({ ...aCase, pendingShares: [shareCaseUsers[0]] })),
};
export const shareCaseAdditionResult = shareCaseInitialCases.slice(0, 2).map((aCase) => ({
  ...aCase,
  sharedWith: [...aCase.sharedWith!, shareCaseUsers[0]],
}));
export const shareCaseRemovalRequest = {
  sharedCases: [
    {
      caseId: shareCaseInitialCases[0].caseId,
      caseTitle: shareCaseInitialCases[0].caseTitle,
      caseTypeId: shareableCaseType,
      sharedWith: [retainedShareRecipient, existingShareRecipient],
      pendingUnshares: [existingShareRecipient],
    },
    {
      caseId: shareCaseInitialCases[1].caseId,
      caseTitle: shareCaseInitialCases[1].caseTitle,
      caseTypeId: shareableCaseType,
      sharedWith: [retainedShareRecipient],
    },
  ],
};
export const shareCaseRemovalResult = [
  { ...shareCaseInitialCases[0], sharedWith: [retainedShareRecipient] },
  shareCaseInitialCases[1],
];

export function buildSharingCaseList() {
  const caseList = buildCaseListMock(3);
  return {
    ...caseList,
    results: caseList.results.map((result, index) => ({
      ...result,
      case_id: shareCaseInitialCases[index].caseId,
      case_fields: {
        ...result.case_fields,
        '[CASE_REFERENCE]': shareCaseInitialCases[index].caseId,
        case_title: shareCaseInitialCases[index].caseTitle,
      },
    })),
  };
}
