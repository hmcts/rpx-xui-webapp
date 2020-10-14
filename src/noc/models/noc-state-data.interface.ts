import { NocAnswer } from './noc-answer.interface';
import { NocError } from './noc-error.interface';
import { NocOptions } from './noc-options.interface';
import { NocQuestion } from './noc-question.interface';
import { NocState } from './noc-state.enum';

export interface NocStateData {
    state: NocState;
    caseReference: string;
    lastError?: NocError;
    questions: NocQuestion[];
    answers: NocAnswer[];
    reason?: string;
    affirmationAgreed: boolean;
    options: NocOptions;
    validationErrors?: {}
}
