import { Answer } from './answer';
import { IsHiddenSource } from './hearings.enum';

export interface Section {
  insetInfo?: string;
  sectionHTMLTitle: string;
  answers?: Answer[];
  isHiddenSource?: IsHiddenSource;
  isHiddenMargin?: boolean;
}
