import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq } from 'sinon-express-mock';
import { CASE_ALLOCATOR_ROLE, JUDICIAL_TYPE, LEGAL_OPS_TYPE } from '../user/constants';
import { checkIfCaseAllocator } from './roleService';
import * as userModule from '../user';

chai.use(sinonChai);
describe('RoleService', () => {
  let sandbox: sinon.SinonSandbox;
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
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });
  describe('handleShowAllocator jurisdiction locationId', () => {
    it('Legal Ops user', async () => {
      const req = mockReq({
        session: {
          passport: {
            user: {
              userinfo: {}
            }
          }
        }
      });
      sandbox
        .stub(userModule, 'getUserRoleAssignments')
        .resolves(roleAssignmentResponse);
      const response = await checkIfCaseAllocator('IA', '231596', req);
      expect(response).to.be.equal(true);
    });

    it('Judicial user', async () => {
      const req = mockReq({
        session: {
          passport: {
            user: {
              userinfo: {}
            }
          }
        }
      });
      sandbox
        .stub(userModule, 'getUserRoleAssignments')
        .resolves(roleAssignmentResponse);
      const response = await checkIfCaseAllocator('IA', '331234', req);
      expect(response).to.be.equal(true);
    });
  });
});
