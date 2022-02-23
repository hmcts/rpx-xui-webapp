import {HearingActualsPartyDetailsModel} from './hearingActualsPartyDetails.model';
import {Section} from './section';

export interface ActualsSection extends Section {
  updateLink?: string;
  parties?: Partial<HearingActualsPartyDetailsModel>[];
}
