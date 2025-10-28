import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import { mockReq } from 'sinon-express-mock';
import { CASE_ALLOCATOR_ROLE, JUDICIAL_TYPE, LEGAL_OPS_TYPE } from '../user/constants';
import { checkIfCaseAllocator } from './roleService';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
describe('RoleService', () => {
  const roleAssignmentResponse = [
    {
      id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
      actorIdType: 'IDAM',
      actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
      roleType: 'ORGANISATION',
      roleName: CASE_ALLOCATOR_ROLE,
      classification: 'PUBLIC',
      grantType: 'STANDARD',
      roleCategory: LEGAL_OPS_TYPE,
      readOnly: false,
      created: Date.UTC.toString(),
      attributes: {
        baseLocation: '231596',
        jurisdiction: 'IA'
      }
    },
    {
      id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
      actorIdType: 'IDAM',
      actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
      roleType: 'ORGANISATION',
      roleName: CASE_ALLOCATOR_ROLE,
      classification: 'PUBLIC',
      grantType: 'STANDARD',
      roleCategory: JUDICIAL_TYPE,
      readOnly: false,
      created: Date.UTC.toString(),
      attributes: {
        baseLocation: '331234',
        jurisdiction: 'IA'
      }
    }
  ];
  describe('handleShowAllocator jurisdiction locationId', () => {
    it('Legal Ops user', () => {
      const req = mockReq({
        session: {
          roleAssignmentResponse
        }
      });
      const response = checkIfCaseAllocator('IA', '231596', req);
      expect(response).to.be.equal(true);
    });

    it('Judicial user', () => {
      const req = mockReq({
        session: {
          roleAssignmentResponse
        }
      });
      const response = checkIfCaseAllocator('IA', '331234', req);
      expect(response).to.be.equal(true);
    });
  });
});
