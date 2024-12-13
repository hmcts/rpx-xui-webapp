import { expect } from 'chai';
import { CASE_ALLOCATOR_ROLE, LEGAL_OPS_TYPE } from './constants';
import { allDoNotContainDangerousCharacters, getOrganisationRoles, getUserRoleCategory, hasNoDangerousCharacters, isCurrentUserCaseAllocator, urlHasNoDangerousCharacters, userDetailsValid } from './utils';

describe('user.utils', () => {
  describe('isCurrentUserCaseAllocator without jurisdiction and location', () => {
    it('should return true', () => {
      const ROLE_ASSIGNMENT_EXAMPLE = {
        id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
        actorIdType: 'IDAM',
        actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
        roleType: 'ORGANISATION',
        roleName: CASE_ALLOCATOR_ROLE,
        classification: 'PUBLIC',
        grantType: 'STANDARD',
        roleCategory: LEGAL_OPS_TYPE,
        readOnly: false,
        created: new Date(2021, 9, 8),
        attributes: {
          baseLocation: '231596',
          jurisdiction: 'IA'
        }
      };
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE)).to.equal(true);
    });

    it('should return false', () => {
      const ROLE_ASSIGNMENT_EXAMPLE = {
        id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
        actorIdType: 'IDAM',
        actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
        roleType: 'ORGANISATION',
        roleName: 'ROLE',
        classification: 'PUBLIC',
        grantType: 'STANDARD',
        roleCategory: LEGAL_OPS_TYPE,
        readOnly: false,
        created: new Date(2021, 9, 8),
        attributes: {
          baseLocation: '231596',
          jurisdiction: 'IA'
        }
      };
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE)).to.equal(false);
    });
  });

  describe('isCurrentUserCaseAllocator with jurisdiction and location', () => {
    it('should return true', () => {
      const ROLE_ASSIGNMENT_EXAMPLE = {
        id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
        actorIdType: 'IDAM',
        actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
        roleType: 'ORGANISATION',
        roleName: CASE_ALLOCATOR_ROLE,
        classification: 'PUBLIC',
        grantType: 'STANDARD',
        roleCategory: LEGAL_OPS_TYPE,
        readOnly: false,
        created: new Date(2021, 9, 8),
        attributes: {
          baseLocation: '231596',
          jurisdiction: 'IA'
        }
      };
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE, 'IA', '231596')).to.equal(true);
    });

    it('should return false', () => {
      const ROLE_ASSIGNMENT_EXAMPLE = {
        id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
        actorIdType: 'IDAM',
        actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
        roleType: 'ORGANISATION',
        roleName: CASE_ALLOCATOR_ROLE,
        classification: 'PUBLIC',
        grantType: 'STANDARD',
        roleCategory: LEGAL_OPS_TYPE,
        readOnly: false,
        created: new Date(2021, 9, 8),
        attributes: {
          baseLocation: '231596',
          jurisdiction: 'IA'
        }
      };
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE, 'DIVORCE', '123123')).to.equal(false);
    });
  });

  describe('getOrganisationRoles', () => {
    it('should return empty when empty array', () => {
      const roleAssignmentInfo = [];
      const response = getOrganisationRoles(roleAssignmentInfo);
      expect(response.length).to.equal(0);
    });

    it('should return empty when null', () => {
      const roleAssignmentInfo = null;
      const response = getOrganisationRoles(roleAssignmentInfo);
      expect(response.length).to.equal(0);
    });

    it('should return 1 row', () => {
      const roleAssignmentInfo = [{
        id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
        actorIdType: 'IDAM',
        actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
        roleType: 'CASE',
        roleName: 'SOME_ROLE',
        classification: 'PUBLIC',
        grantType: 'STANDARD',
        roleCategory: LEGAL_OPS_TYPE,
        readOnly: false,
        created: new Date(2021, 9, 8),
        attributes: {
          baseLocation: '231596',
          jurisdiction: 'IA'
        }
      },
      {
        id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac3',
        actorIdType: 'IDAM',
        actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
        roleType: 'ORGANISATION',
        roleName: CASE_ALLOCATOR_ROLE,
        classification: 'PUBLIC',
        grantType: 'STANDARD',
        roleCategory: LEGAL_OPS_TYPE,
        readOnly: false,
        created: new Date(2021, 9, 8),
        attributes: {
          baseLocation: '231596',
          jurisdiction: 'IA'
        }
      }];
      const response = getOrganisationRoles(roleAssignmentInfo);
      expect(response.length).to.equal(1);
      expect(response[0]).to.equal(CASE_ALLOCATOR_ROLE);
    });
  });

  describe('getUserRoleCategory', () => {
    it('should return UserRoleCategory', () => {
      const roles = ['ADMIN', 'caseworker-ia',
        'caseworker-ia-caseofficer', 'cwd-user',
        'case-allocator', 'tribunal-caseworker',
        'hmcts-legal-operations', 'task-supervisor'];
      expect(getUserRoleCategory(roles)).to.equal('admin');
    });
  });

  describe('hasNoDangerousCharacters', () => {
    it('should match strings that do not contain dangerous characters', () => {
      expect(hasNoDangerousCharacters(null)).to.equal(true);
      const testString = '<script>alert("hello")</script>';
      expect(hasNoDangerousCharacters(testString)).to.equal(false);
      const testString2 = 'email@test.com';
      expect(hasNoDangerousCharacters(testString2)).to.equal(true);
      const testString3 = '&//?';
      expect(hasNoDangerousCharacters(testString3)).to.equal(false);
      const testString4 = '//https://www.google.com';
      expect(hasNoDangerousCharacters(testString4)).to.equal(false);
    });
  });

  describe('urlHasNoDangerousCharacters', () => {
    it('should match urls that do not contain dangerous characters', () => {
      expect(urlHasNoDangerousCharacters(null)).to.equal(true);
      const testString = '<script>alert("hello")</script>';
      expect(urlHasNoDangerousCharacters(testString)).to.equal(false);
      const testString2 = 'email@test.com';
      expect(urlHasNoDangerousCharacters(testString2)).to.equal(true);
      const testString3 = '&//?';
      expect(urlHasNoDangerousCharacters(testString3)).to.equal(true);
      const testString4 = '//https://www.google.com';
      expect(urlHasNoDangerousCharacters(testString4)).to.equal(true);
    });
  });

  describe('allDoNotContainDangerousCharacters', () => {
    it('should match lists with strings that do not contain dangerous characters', () => {
      expect(allDoNotContainDangerousCharacters([])).to.equal(true);
      const testList = ['ab', 'cd=ef', 'gh.jk'];
      expect(allDoNotContainDangerousCharacters(testList)).to.equal(true);
      testList.push('lm<n');
      expect(allDoNotContainDangerousCharacters(testList)).to.equal(false);
    });
  });

  describe('userDetailsValid', () => {
    const mockUserDetails = {
      given_name: 'judge',
      email: 'test@ejudiciary.net',
      family_name: 'user',
      name: 'judge user',
      ssoProvider: 'testing-support',
      uid: '12345-45678-567890',
      identity: 'id=12345-45678-567890,ou=test-config',
      roles: [
        'test-role',
        'caseworker-role',
        'judge-role'
      ],
      sub: 'test@ejudiciary.net',
      subname: 'test@ejudiciary.net',
      iss: 'https://test-url.com?test=1'
    };
    it('should ensure user details are valid', () => {
      expect(userDetailsValid(null)).to.equal(true);
      expect(userDetailsValid(mockUserDetails)).to.equal(true);
    });

    it('should set user details to invalid if it has dangerous characters', () => {
      mockUserDetails.email = '<script>alert("hello")</script>';
      expect(userDetailsValid(mockUserDetails)).to.equal(false);
      mockUserDetails.email = 'test@ejudiciary.net';
    });

    it('should set user details to invalid if iss has dangerous characters', () => {
      mockUserDetails.iss = '/*http://test-url.com';
      expect(userDetailsValid(mockUserDetails)).to.equal(false);
      mockUserDetails.iss = 'http://test-url.com&';
      expect(userDetailsValid(mockUserDetails)).to.equal(true);
    });
  });
});
