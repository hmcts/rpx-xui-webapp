export class NocQuestion {
  public case_type_id: string;
  public order: string;
  public question_text: string;
  public answer_field_type: {
    id: string;
    type: string;
    min: null | number;
    max: null | number;
    regular_expression: any;
    fixed_list_items: [];
    complex_fields: [];
    collection_field_type: null | any;
  };
  public display_context_parameter: string;
  public challenge_question_id: string;
  public answer_field: string;
  public question_id: string;
}
