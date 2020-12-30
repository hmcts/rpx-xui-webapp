import { NocAnswer } from './noc-answer.interface';

export interface NocEvent {
    caseReference: string;
    nocAnswers: NocAnswer[];
}
