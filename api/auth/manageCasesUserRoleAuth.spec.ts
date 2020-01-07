import {expect} from 'chai'
import {
  userHasAppAccess
} from './manageCasesUserRoleAuth'

describe('Manage Cases userRoleAuthentication', () => {

  it('Should return true if a User has a Case Worker Role.', () => {

    const roles = [
      'pui-case-manager',
      'caseworker-probate',
    ]

    expect(userHasAppAccess(roles)).to.be.true
  })

  it('Should return false if a User does not have a Case Worker Role.', () => {

    const roles = [
      'pui-case-manager',
    ]

    expect(userHasAppAccess(roles)).to.be.false
  })

  it('Should return false if a User does not have any roles.', () => {

    const roles = []

    expect(userHasAppAccess(roles)).to.be.false
  })
})
