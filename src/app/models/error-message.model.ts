export interface ErrorMessage {
  title: string;
  description: string;
  fieldId?: string;
  multiple?: boolean;
  errors?: MultipleErrorMessage[];
}

export interface MultipleErrorMessage {
  error: string;
  name?: string;
}
