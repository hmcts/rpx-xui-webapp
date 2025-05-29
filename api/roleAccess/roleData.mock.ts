import { RoleCategory } from '@hmcts/rpx-xui-common-lib';

export const mockAdminRoles: any[] = [{
  name: 'Admin Role',
  roleName: 'Admin Role',
  id: 'admin-role',
  location: null,
  roleCategory: RoleCategory.ADMIN,
  start: '01-01-2022',
  end: '02-02-2023',
  actorId: null,
  email: 'admin-role@admin.com',
  actions: [
    { 'id': 'reallocate', 'title': 'Reallocate' },
    { 'id': 'remove', 'title': 'Remove Allocation' }
  ]
},
{
  name: 'Admin Role 2',
  roleName: 'Admin Role 2',
  id: 'admin-role-2',
  location: null,
  roleCategory: RoleCategory.ADMIN,
  start: '01-01-2021',
  end: '03-03-2022',
  actorId: null,
  email: 'admin-role-2@admin.com',
  actions: [
    { 'id': 'reallocate', 'title': 'Reallocate' },
    { 'id': 'remove', 'title': 'Remove Allocation' }
  ]
}];

export const mockAdminRefinedRoles: any[] = [{
  roleCategory: 'ADMIN',
  roleId: 'admin-role',
  roleName: 'Admin Role',
  roleJurisdiction: { values: ['IA'] }
},
{
  roleCategory: 'ADMIN',
  roleId: 'admin-role-2',
  roleName: 'Admin Role the second',
  roleJurisdiction: { values: ['IA'] }
}];
