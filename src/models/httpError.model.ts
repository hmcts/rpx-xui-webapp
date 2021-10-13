export interface HttpError {
  status: number;
  message: string;
  statusText?: string;
  errors?: [];
}
