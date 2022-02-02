import {Answer} from './answer';

export interface Section {
  insetInfo?: string;
  sectionHTMLTitle: string;
  sectionOrder: number;
  answers: Answer[];
}
