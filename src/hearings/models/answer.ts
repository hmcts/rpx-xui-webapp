export interface Answer {
  answerTitle: string;
  answerSource: string;
  answerOrder: number;
  changeLink?: string;
  isHidden?: boolean; // default false
}
