import {AnswerSource, IsHiddenSource} from './hearings.enum';

export interface Answer {
  answerTitle: string;
  answerSource: AnswerSource;
  answerOrder: number;
  changeLink?: string;
  isHiddenSource?: IsHiddenSource;
}
