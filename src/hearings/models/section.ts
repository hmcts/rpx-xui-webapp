import {Answer} from './answer';
import {IsHiddenSource} from './hearings.enum';
import {PartyDetailsModel} from './partyDetails.model';

export interface Section {
  insetInfo?: string;
  sectionHTMLTitle: string;
  answers?: Answer[];
  isHiddenSource?: IsHiddenSource;
  updateLink?: string;
  parties?: Partial<PartyDetailsModel>[];
}
