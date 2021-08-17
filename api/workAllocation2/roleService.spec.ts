import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { mockReq } from 'sinon-express-mock';
import { handleShowAllocatorLinkByCaseId } from './roleService';

chai.use(sinonChai);
describe('RoleService', () => {
  const roleAssignmentResponse = [
    {
      actorId: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
      actorIdType: 'IDAM',
      attributes: {
        caseId: '1589185661976908',
        jurisdiction: 'IA',
        primaryLocation: '231596',
        region: 'north-east',
      },
      authorisations: [
        'case-allocator-role',
      ],
      classification: 'PUBLIC',
      created: '2021-07-15T15:45:10.200296Z',
      grantType: 'STANDARD',
      id: '39c68f10-c436-460e-991f-26a5d609ff17',
      readOnly: false,
      roleCategory: 'JUDICIAL',
      roleName: 'judge',
      roleType: 'ORGANISATION',
    },
    {
      actorId: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
      actorIdType: 'IDAM',
      attributes: {
        caseId: '1589185982594513',
        jurisdiction: 'IA',
        primaryLocation: '231596',
        region: 'north-east',
      },
      authorisations: [
        'case',
      ],
      classification: 'PUBLIC',
      created: '2021-07-15T15:42:32.384849Z',
      grantType: 'STANDARD',
      id: '61a5f990-4cfb-4895-92f0-ffacff2b7351',
      readOnly: false,
      roleCategory: 'JUDICIAL',
      roleName: 'judge',
      roleType: 'ORGANISATION',
    },
    {
      actorId: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
      actorIdType: 'IDAM',
      attributes: {
        caseId: '1589185661976908',
        jurisdiction: 'IA',
        primaryLocation: '231596',
        region: 'north-east',
      },
      authorisations: [
        'case',
      ],
      classification: 'PUBLIC',
      created: '2021-07-15T15:42:17.295769Z',
      grantType: 'STANDARD',
      id: 'fc8085c4-029b-47a2-99f8-1c3de04d77d3',
      readOnly: false,
      roleCategory: 'JUDICIAL',
      roleName: 'judge',
      roleType: 'ORGANISATION',
    },
    {
      actorId: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
      actorIdType: 'IDAM',
      attributes: {
        caseId: '1589185060514243',
        jurisdiction: 'IA',
        primaryLocation: '231596',
        region: 'north-east',
      },
      authorisations: [
        'case-allocator-role',
      ],
      classification: 'PUBLIC',
      created: '2021-07-15T15:41:55.934311Z',
      grantType: 'STANDARD',
      id: '31ea656a-b6c4-42c7-98e9-e4cdc90deb45',
      readOnly: false,
      roleCategory: 'JUDICIAL',
      roleName: 'judge',
      roleType: 'ORGANISATION',
    },
    {
      actorId: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
      actorIdType: 'IDAM',
      attributes: {
        caseId: '1589185982594513',
        jurisdiction: 'IA',
        primaryLocation: '231596',
        region: 'north-east',
      },
      authorisations: [
        'case-allocator-role',
      ],
      classification: 'PUBLIC',
      created: '2021-07-15T15:41:18.643176Z',
      grantType: 'STANDARD',
      id: 'e335114f-ae7c-48e3-a361-435dc19fd2ae',
      readOnly: false,
      roleCategory: 'JUDICIAL',
      roleName: 'judge',
      roleType: 'ORGANISATION',
    },
    {
      actorId: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
      actorIdType: 'IDAM',
      attributes: {
        caseId: '1589185982594513',
        jurisdiction: 'IA',
        primaryLocation: '231596',
        region: 'north-east',
      },
      authorisations: [
        'case',
      ],
      classification: 'PUBLIC',
      created: '2021-07-15T15:41:07.799807Z',
      grantType: 'STANDARD',
      id: '86236448-629e-45cd-b034-b280a8ba42f5',
      readOnly: false,
      roleCategory: 'JUDICIAL',
      roleName: 'judge',
      roleType: 'ORGANISATION',
    },
    {
      actorId: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
      actorIdType: 'IDAM',
      attributes: {
        caseId: '1589185982594513',
        jurisdiction: 'IA',
        primaryLocation: '231596',
        region: 'north-east',
      },
      authorisations: [
        'case',
      ],
      classification: 'PUBLIC',
      created: '2021-07-15T15:39:45.620084Z',
      grantType: 'STANDARD',
      id: 'e4cce151-07ea-4562-93f2-97c7f68fedcb',
      readOnly: false,
      roleCategory: 'JUDICIAL',
      roleName: 'judge',
      roleType: 'ORGANISATION',
    },
  ];
  describe('handleShowAllocatorLinkByCaseId', () => {
    it('user should be able to see an allocator link', () => {
      const req = mockReq({
        session: {
          roleAssignmentResponse,
        },
      });
      const response = handleShowAllocatorLinkByCaseId('1589185661976908', req);
      expect(response).to.be.equal(true);
    });

    it('user should not be able to see an allocator link', () => {
      const req = mockReq({
        session: {
          roleAssignmentResponse,
        },
      });
      const response = handleShowAllocatorLinkByCaseId('1546883526751282', req);
      expect(response).to.be.equal(false);
    });
  });
});
