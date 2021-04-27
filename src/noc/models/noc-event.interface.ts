import { NocAnswer } from './noc-answer.interface';

export interface NocEvent {
    case_id: string;
    answers: NocAnswer[];
}
