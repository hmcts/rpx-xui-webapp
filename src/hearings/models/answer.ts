import {AnswerSource, IsHiddenSource} from './hearings.enum';

export interface Answer {
  id: string;
  answerTitle: string;
  answerSource: AnswerSource;
  changeLink?: string;
  isHiddenSource?: IsHiddenSource;
  isAmendedSource?: AnswerSource;
  isHiddenMargin?: boolean;
}
