import { CCDRawUserModel } from '../models/ccd-raw-user.model'
import { PRDRawUserModel } from '../models/prd-raw-user.model'
import { UserDetails } from '../models/user-details.model'

export function prdToUserDetails(rawUser: PRDRawUserModel): UserDetails {
  return {
    email: rawUser.email,
    firstName: rawUser.firstName,
    idamId: rawUser.userIdentifier,
    lastName: rawUser.lastName,
  }
}

export function ccdToUserDetails(rawUser: CCDRawUserModel): UserDetails {
  return {
    caseRoles: rawUser.case_roles,
    email: rawUser.email,
    firstName: rawUser.first_name,
    idamId: rawUser.idam_id,
    lastName: rawUser.last_name,
  }
}
