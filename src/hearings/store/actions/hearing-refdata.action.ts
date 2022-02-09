import {Action} from '@ngrx/store';
import {RefDataModel} from 'api/hearings/models/refData.model';

export const LOAD_HEARINGS_FACILITIES_DATA = '[HEARINGS REFDATA] Load Hearings Facilities Data';
export const LOAD_HEARINGS_FACILITIES_DATA_SUCCESS = '[HEARINGS REFDATA] Load Hearings Facilities Data Success';

export class LoadHearingsFacilitiesData implements Action {
  public readonly type = LOAD_HEARINGS_FACILITIES_DATA;
}

export class LoadHearingsFacilitiesDataSuccess implements Action {
  public readonly type = LOAD_HEARINGS_FACILITIES_DATA_SUCCESS;

  constructor(public payload: RefDataModel[]) {
  }
}

export type HearingRefDataAction = LoadHearingsFacilitiesData
  | LoadHearingsFacilitiesDataSuccess;
