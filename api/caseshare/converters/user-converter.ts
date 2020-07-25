import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model'
import { RawUserModel } from '../models/raw-user.model'

export function toUserDetails(rawUser: RawUserModel): UserDetails {
  return {
    email: rawUser.email,
    firstName: rawUser.firstName,
    idamId: rawUser.userIdentifier,
    lastName: rawUser.lastName,
  }
}
