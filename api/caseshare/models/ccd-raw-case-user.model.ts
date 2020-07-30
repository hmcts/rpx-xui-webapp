import { CCDRawUserModel } from './ccd-raw-user.model'

export interface CCDRawCaseUserModel {
  case_id: string
  case_title: string
  shared_with: CCDRawUserModel[]
}
