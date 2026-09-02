import { getUserRolesExcludingSpecificAccessApprover } from './role.utils';

describe('role utils', () => {
  it('should exclude specific access approver roles', () => {
    expect(
      getUserRolesExcludingSpecificAccessApprover([
        'caseworker-civil',
        'specific-access-approver-judiciary',
        'judge',
        'specific-access-approver-legal-ops',
      ])
    ).toEqual(['caseworker-civil', 'judge']);
  });

  it('should handle omitted and nullish role inputs defensively', () => {
    expect(getUserRolesExcludingSpecificAccessApprover()).toEqual([]);
    expect(getUserRolesExcludingSpecificAccessApprover(null as unknown as string[])).toEqual([]);
  });
});
