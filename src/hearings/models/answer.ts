import { AnswerSource, IsHiddenSource } from './hearings.enum';

// Used in Section interface to define the answers that will be displayed in the summary page, and where to get the answer from
export interface Answer {
  id: string;
  answerTitle: string;
  answerSource: AnswerSource;
  changeLink?: string;
  isHiddenSource?: IsHiddenSource;
  isAmendedSource?: AnswerSource;
  isHiddenMargin?: boolean;
}
