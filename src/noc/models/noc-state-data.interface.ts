import { NocAnswer } from './noc-answer.interface';
import { NocHttpError } from './noc-http-error.interface';
import { NocOptions } from './noc-options.interface';
import { NocQuestion } from './noc-question.interface';
import { NocState } from './noc-state.enum';

export interface NocStateData {
    state: NocState;
    caseReference: string;
    lastError?: NocHttpError;
    questions: NocQuestion[];
    answers: NocAnswer[];
    reason?: string;
    affirmationAgreed: boolean;
    notifyEveryParty: boolean;
    options: NocOptions;
    validationErrors?: {};
}
