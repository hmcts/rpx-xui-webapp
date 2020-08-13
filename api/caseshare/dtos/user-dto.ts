import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model'
import { CCDRawUserModel } from '../models/ccd-raw-user.model'
import { PRDRawUserModel } from '../models/prd-raw-user.model'

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
    email: rawUser.email,
    firstName: rawUser.first_name,
    idamId: rawUser.idam_id,
    lastName: rawUser.last_name,
  }
}
