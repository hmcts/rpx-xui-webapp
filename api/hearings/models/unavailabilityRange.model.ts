import {UnavailabilityType} from './hearings.enum';

export interface UnavailabilityRangeModel {
  unavailableFromDate: string;
  unavailableToDate: string;
  unavailabilityType: UnavailabilityType;
}
