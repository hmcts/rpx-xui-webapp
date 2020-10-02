export enum Noc {
    START,
    CASE_REF_VALIDATION_FAILURE,
    CASE_REF_SUBMISSION_FAILURE,
    QUESTION,
    ANSWER_INCOMPLETE,
    ANSWER_SUBMISSION_FAILURE,
    CHECK_ANSWERS,
    AFFIRMATION_NOT_AGREED,
    SUBMISSION_SUCCESS_APPROVED,
    SUBMISSION_SUCCESS_PENDING,
    SUBMISSION_FAILURE
}

export interface NocError {
    responseCode: number;
    message: string;
}

export interface NocQuestion {
    displayOrder: number;
    answerType: string;
    displayContext: string;
    questionLabel: string;
}

export interface NocQuestions {
    questions: NocQuestion[];
}

export interface NoCAnswer {
    displayOrder: number;
    answer: string;
}

export interface NocOptions {
    askForReason: boolean;
    showRequestType: boolean;
}

export interface NocState {
    state: Noc;
    lastError?: NocError;
    questions: NocQuestions;
    answers: NoCAnswer[];
    reason?: string;
    affirmationAgreed: boolean;
    options: NocOptions;
}
