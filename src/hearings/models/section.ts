import {Answer} from './answer';
import {IsHiddenSource} from './hearings.enum';

export interface Section {
  insetInfo?: string;
  sectionHTMLTitle: string;
  sectionOrder: number;
  answers: Answer[];
  isHiddenSource?: IsHiddenSource;
}
