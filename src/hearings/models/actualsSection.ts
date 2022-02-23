import {Answer} from './answer';
import {HearingActualsPartyDetailsModel} from './hearingActualsPartyDetails.model';
import {IsHiddenSource} from './hearings.enum';

export interface ActualsSection {
  insetInfo?: string;
  sectionHTMLTitle: string;
  answers?: Answer[];
  isHiddenSource?: IsHiddenSource;
  updateLink?: string;
  parties?: Partial<HearingActualsPartyDetailsModel>[];
}
