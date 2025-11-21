import { expect } from 'chai';
import * as sinon from 'sinon';
import { SharedCase, UserDetails } from '@hmcts/rpx-xui-common-lib';
import { toCaseAssigneeMappingModel } from './case-user-dto';
import { CaseAssigneeMappingModel } from '../models/case-assignee-mapping.model';

describe('CaseUserDTO', () => {
  describe('toCaseAssigneeMappingModel', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should map UserDetails and SharedCase to CaseAssigneeMappingModel correctly', () => {
      const mockUserDetails: UserDetails = {
        idamId: 'test-idam-id-123',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe'
      };

      const mockSharedCase: SharedCase = {
        caseId: 'test-case-id-456',
        caseTitle: 'Test Case Title',
        caseTypeId: 'TestCaseType'
      };

      const expectedMapping: CaseAssigneeMappingModel = {
        assignee_id: 'test-idam-id-123',
        case_id: 'test-case-id-456'
      };

      const result = toCaseAssigneeMappingModel(mockUserDetails, mockSharedCase);

      expect(result).to.deep.equal(expectedMapping);
    });

    it('should handle UserDetails with minimal properties', () => {
      const minimalUserDetails: UserDetails = {
        idamId: 'minimal-idam-id',
        email: '',
        firstName: '',
        lastName: ''
      };

      const mockSharedCase: SharedCase = {
        caseId: 'case-123',
        caseTitle: 'Case Title',
        caseTypeId: 'CaseType'
      };

      const expectedMapping: CaseAssigneeMappingModel = {
        assignee_id: 'minimal-idam-id',
        case_id: 'case-123'
      };

      const result = toCaseAssigneeMappingModel(minimalUserDetails, mockSharedCase);

      expect(result).to.deep.equal(expectedMapping);
      expect(result.assignee_id).to.equal('minimal-idam-id');
      expect(result.case_id).to.equal('case-123');
    });

    it('should handle SharedCase with minimal properties', () => {
      const mockUserDetails: UserDetails = {
        idamId: 'user-456',
        email: 'user@example.com',
        firstName: 'Jane',
        lastName: 'Smith'
      };

      const minimalSharedCase: SharedCase = {
        caseId: 'minimal-case-id',
        caseTitle: '',
        caseTypeId: ''
      };

      const expectedMapping: CaseAssigneeMappingModel = {
        assignee_id: 'user-456',
        case_id: 'minimal-case-id'
        // No case_type_id expected since it's an empty string
      };

      const result = toCaseAssigneeMappingModel(mockUserDetails, minimalSharedCase);

      expect(result).to.deep.equal(expectedMapping);
      expect(result.assignee_id).to.equal('user-456');
      expect(result.case_id).to.equal('minimal-case-id');
    });

    it('should properly extract only the required fields from complex objects', () => {
      const complexUserDetails: UserDetails = {
        idamId: 'complex-user-id',
        email: 'complex@example.com',
        firstName: 'Complex',
        lastName: 'User',
        // Adding additional properties that would be present in real data
        caseRoles: ['[CREATOR]', '[DEFENDANT]']
      } as UserDetails & { caseRoles: string[] };

      const complexSharedCase: SharedCase = {
        caseId: 'complex-case-id',
        caseTitle: 'Complex Case Title',
        caseTypeId: 'ComplexCaseType',
        // Adding additional properties that would be present in real data
        pendingShares: [],
        sharedWith: [],
        pendingUnshares: []
      } as SharedCase & {
        pendingShares: UserDetails[],
        sharedWith: UserDetails[],
        pendingUnshares: UserDetails[]
      };

      const expectedMapping: CaseAssigneeMappingModel = {
        assignee_id: 'complex-user-id',
        case_id: 'complex-case-id'
      };

      const result = toCaseAssigneeMappingModel(complexUserDetails, complexSharedCase);

      expect(result).to.deep.equal(expectedMapping);
      expect(Object.keys(result).length).to.equal(2); // Should only have two expected properties
    });

    it('should not include case_type_id even when caseTypeId is available in SharedCase', () => {
      const mockUserDetails: UserDetails = {
        idamId: 'test-user-id',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe'
      };

      const mockSharedCase: SharedCase = {
        caseId: 'case-123',
        caseTitle: 'Case Title',
        caseTypeId: 'TestCaseType123'
      };

      const expectedMapping: CaseAssigneeMappingModel = {
        assignee_id: 'test-user-id',
        case_id: 'case-123'
      };

      const result = toCaseAssigneeMappingModel(mockUserDetails, mockSharedCase);

      expect(result).to.deep.equal(expectedMapping);
      expect(result.case_type_id).to.be.undefined;
    });

    it('should handle undefined fields by returning undefined in the mapping model', () => {
      const incompleteUser = {} as UserDetails; // Missing idamId
      const incompleteCase = {} as SharedCase; // Missing caseId

      const result = toCaseAssigneeMappingModel(incompleteUser, incompleteCase);

      expect(result.assignee_id).to.be.undefined;
      expect(result.case_id).to.be.undefined;
    });
  });
});
