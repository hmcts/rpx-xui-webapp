import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { FullUserDetailCache } from './fullUserDetailCache';

chai.use(sinonChai);

describe('workAllocation.fullUserDetailCache', () => {
  let sandbox: sinon.SinonSandbox;

  const users = [
    { idamId: 'user1', email: 'user1@test.com', firstName: 'A', lastName: 'One' } as any,
    { idamId: 'user2', email: 'user2@test.com', firstName: 'B', lastName: 'Two' } as any,
    { idamId: 'user3', email: 'user3@test.com', firstName: 'C', lastName: 'Three' } as any,
    { idamId: null, email: 'unknown@test.com', firstName: 'Unknown', lastName: 'User' } as any
  ];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    FullUserDetailCache.setUserDetails(users);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('setUserDetails should store all users', () => {
    const allUsers = FullUserDetailCache.getAllUserDetails();
    expect(allUsers).to.deep.equal(users);
  });

  it('getUserByIdamId should return matching user', () => {
    const user = FullUserDetailCache.getUserByIdamId('user2');
    expect(user).to.equal(users[1]);
  });

  it('getUserByIdamId should return null for no string', () => {
    const user = FullUserDetailCache.getUserByIdamId('');
    expect(user).to.equal(null);
  });

  it('getUserByIdamId should return undefined for unknown id', () => {
    const user = FullUserDetailCache.getUserByIdamId('unknown');
    expect(user).to.equal(undefined);
  });

  it('user with null idamId is not indexed', () => {
    const user = FullUserDetailCache.getUserByIdamId(null as any);
    expect(user).to.equal(null);
    const userList = FullUserDetailCache.getUsersByIdamIds([null as any]);
    expect(userList).to.deep.equal([]);
  });

  it('getUsersByIdamIds should return users for given ids', () => {
    const userList = FullUserDetailCache.getUsersByIdamIds(['user3', 'user1']);
    expect(userList).to.deep.equal([users[2], users[0]]);
  });

  it('getUsersByIdamIds should remove duplicate ids preserving first occurrence order', () => {
    const userList = FullUserDetailCache.getUsersByIdamIds(['user1', 'user2', 'user1', 'user2', 'user3']);
    expect(userList).to.deep.equal([users[0], users[1], users[2]]);
  });

  it('getUsersByIdamIds should ignore unknown ids', () => {
    const userList = FullUserDetailCache.getUsersByIdamIds(['user1', 'nonuser', 'user3']);
    expect(userList).to.deep.equal([users[0], users[2]]);
  });

  it('getUsersByIdamIds should return empty array for empty input', () => {
    const userList = FullUserDetailCache.getUsersByIdamIds([]);
    expect(userList).to.deep.equal([]);
  });

  it('getUsersByIdamIds should return empty array for null input', () => {
    const userList = FullUserDetailCache.getUsersByIdamIds(null);
    expect(userList).to.deep.equal([]);
  });

  it('setUserDetails with empty array should clear cache', () => {
    FullUserDetailCache.setUserDetails([]);
    expect(FullUserDetailCache.getAllUserDetails()).to.deep.equal([]);
    expect(FullUserDetailCache.getUserByIdamId('user1')).to.equal(undefined);
    expect(FullUserDetailCache.getUsersByIdamIds(['user1'])).to.deep.equal([]);
  });
});
