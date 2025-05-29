import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { Caseworker } from '../models/dtos';
import { CaseworkerDisplayName } from './caseworker-display-name.pipe';

const mockCaseworker: Caseworker = {
  idamId: '1234',
  firstName: 'Mr',
  lastName: 'Test',
  email: 'MrTest@email.com',
  location: null,
  roleCategory: RoleCategory.CASEWORKER
};

const mockName = `${mockCaseworker.firstName} ${mockCaseworker.lastName}`;
const mockNameWithEmail = `${mockName} - ${mockCaseworker.email}`;

describe('CaseworkerDisplayName', () => {
  const pipe = new CaseworkerDisplayName();

  it('returns undefined if no caseworker present', () => {
    expect(pipe.transform(null)).toBe(undefined);
  });

  it('returns a display name if the caseworker is present', () => {
    expect(pipe.transform(mockCaseworker)).toBe(mockNameWithEmail);
  });

  it('returns a display name without email if specified', () => {
    expect(pipe.transform(mockCaseworker, false)).toBe(mockName);
  });
});
