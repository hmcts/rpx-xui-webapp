import { CCDRawUserModel } from './ccd-raw-user.model';

export interface CCDRawCaseUserModel {
  case_id: string;
  shared_with: CCDRawUserModel[];
}
