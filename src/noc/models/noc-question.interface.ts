export class NocQuestion {
  case_type_id: string;
  order: string;
  question_text: string;
  answer_field_type: {
    id: string;
    type: string;
    min: null | number;
    max: null | number;
    regular_expression: any;
    fixed_list_items: [];
    complex_fields: [];
    collection_field_type: null | any;
  };
  display_context_parameter: string;
  challenge_question_id: string;
  answer_field: string;
  question_id: string;
}
