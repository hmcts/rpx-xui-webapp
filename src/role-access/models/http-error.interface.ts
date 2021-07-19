export interface HttpError {
  code: string;
  message: string;
  errors?: [];
  status?: string;
}
