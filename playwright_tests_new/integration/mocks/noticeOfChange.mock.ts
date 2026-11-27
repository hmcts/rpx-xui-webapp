import type { NocQuestion } from '../../../src/noc/models/noc-question.interface';
import type { NocQuestions } from '../../../src/noc/models/noc-questions.interface';

export const NOTICE_OF_CHANGE_CASE_REFERENCE = '1652112127295261';
export const NOTICE_OF_CHANGE_SOLICITOR_ROLES = ['pui-case-manager', 'caseworker-divorce-solicitor'];

function buildQuestion(questionId: string, questionText: string, type: string, order: number): NocQuestion {
  return {
    case_type_id: 'SyntheticNoC',
    order: String(order),
    question_text: questionText,
    answer_field_type: {
      id: type,
      type,
      min: null,
      max: null,
      regular_expression: null,
      fixed_list_items: [],
      complex_fields: [],
      collection_field_type: null,
    },
    display_context_parameter: '',
    challenge_question_id: questionId,
    answer_field: questionId,
    question_id: questionId,
  };
}

export function buildNoticeOfChangeQuestionsMock(): NocQuestions {
  return {
    questions: [
      buildQuestion('syntheticName', 'Synthetic client name', 'Text', 1),
      buildQuestion('syntheticEmail', 'Synthetic client email', 'Email', 2),
      buildQuestion('syntheticDate', 'Synthetic client date of birth', 'Date', 3),
    ],
  };
}

export const NOTICE_OF_CHANGE_MISMATCH_ERROR = {
  code: 'answers-not-matched-any-litigant',
  message: 'Synthetic mismatch',
};
