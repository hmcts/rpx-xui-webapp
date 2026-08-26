import { expect } from 'chai';
import 'mocha';
import {
  StaffUserSearchErrorCode,
  StaffUserSearchRequest,
  StaffUserSearchResult,
  validateStaffUserSearchRequest,
} from './staffUserSearch';

describe('StaffUser search contract', () => {
  const VALID_REQUEST: StaffUserSearchRequest = {
    searchTerm: 'Alex',
    caseType: 'PRLAPPS',
    jurisdiction: 'PRIVATELAW',
    roleCategories: ['ADMIN', 'CTSC'],
  };

  it('should accept the public request contract and trim its string fields', () => {
    expect(
      validateStaffUserSearchRequest({
        ...VALID_REQUEST,
        searchTerm: '  Alex  ',
        caseType: ' PRLAPPS ',
        jurisdiction: ' PRIVATELAW ',
      })
    ).to.deep.equal({
      valid: true,
      request: VALID_REQUEST,
    });
  });

  it('should define the allow-listed result contract', () => {
    const result: StaffUserSearchResult = {
      idamId: 'idam-id',
      displayName: 'Alex Admin',
      emailId: 'alex.admin@justice.gov.uk',
    };

    expect(result).to.deep.equal({
      idamId: 'idam-id',
      displayName: 'Alex Admin',
      emailId: 'alex.admin@justice.gov.uk',
    });
  });

  const invalidSearchTermRequests: unknown[] = [
    undefined,
    null,
    {},
    { ...VALID_REQUEST, searchTerm: '' },
    { ...VALID_REQUEST, searchTerm: '  ' },
    { ...VALID_REQUEST, searchTerm: 'Al' },
    { ...VALID_REQUEST, searchTerm: 123 },
  ];

  invalidSearchTermRequests.forEach((request) => {
    it('should reject an invalid search term', () => {
      expect(validateStaffUserSearchRequest(request)).to.deep.equal({
        valid: false,
        errorCode: StaffUserSearchErrorCode.INVALID_SEARCH_TERM,
      });
    });
  });

  [
    { ...VALID_REQUEST, caseType: '' },
    { ...VALID_REQUEST, jurisdiction: '  ' },
  ].forEach((request) => {
    it('should reject missing search context', () => {
      expect(validateStaffUserSearchRequest(request)).to.deep.equal({
        valid: false,
        errorCode: StaffUserSearchErrorCode.INVALID_SEARCH_CONTEXT,
      });
    });
  });

  [[], ['ALL'], ['PROFESSIONAL'], ['CITIZEN'], ['admin'], ['ADMIN', 'UNKNOWN'], 'ADMIN'].forEach((roleCategories) => {
    it(`should reject unsupported role categories ${String(roleCategories)}`, () => {
      expect(validateStaffUserSearchRequest({ ...VALID_REQUEST, roleCategories })).to.deep.equal({
        valid: false,
        errorCode: StaffUserSearchErrorCode.INVALID_ROLE_CATEGORIES,
      });
    });
  });
});
