import {AnswerSource} from './hearings.enum';

export interface Answer {
  answerTitle: string;
  answerSource: AnswerSource;
  answerOrder: number;
  changeLink?: string;
  isHidden?: boolean; // default false
}
