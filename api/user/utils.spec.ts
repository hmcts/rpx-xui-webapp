/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import { CASE_ALLOCATOR_ROLE, ORGANISATION_ROLE_TYPE } from './constants';
import { RoleAssignment } from "./interfaces/roleAssignment";
import { getOrganisationRoles, isCurrentUserCaseAllocator } from './utils';

chai.use(sinonChai);

describe('utils', () => {

   const roleAssignment1: RoleAssignment = {
      attributes: {
         jurisdiction: 'jur 1',
         primaryLocation: 'prim loc 1',
      },
      id: 'id-1',
      roleName: CASE_ALLOCATOR_ROLE,
      roleType: ORGANISATION_ROLE_TYPE,
   };

   const roleAssignment2: RoleAssignment = {
      attributes: {},
      id: 'id-2',
      roleName: 'role name 2',
   };

   const roleAssignment3: RoleAssignment = {
      attributes: {},
      id: 'id-3',
      roleName: 'role name 3',
      roleType: ORGANISATION_ROLE_TYPE,
   };

   describe('getUserRoleAsgetOrganisationRolessignments', () => {

      it('should set array with role names', () =>  {
         const payload: RoleAssignment[] = [];
         payload.push(roleAssignment1);
         payload.push(roleAssignment2);
         payload.push(roleAssignment3);
         const response = getOrganisationRoles(payload);
         expect(response[1]).to.equal('role name 3');
      });
   });

   describe('isCurrentUserCaseAllocator', () => {

      it('should return true', () =>  {
         const response = isCurrentUserCaseAllocator(roleAssignment1, 'jur 1', 'prim loc 1');
         expect(response).to.equal(true);
      });

      it('should return false', () =>  {
         const response = isCurrentUserCaseAllocator(roleAssignment3, 'jur 1', 'prim loc 1');
         expect(response).to.equal(false);
      });
   });
});
