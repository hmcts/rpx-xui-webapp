import { HttpError } from '.';

export interface RoleAccessHttpError {
  headers?: any;
  status: number;
  statusText?: string;
  url?: string;
  ok?: boolean;
  name?: string;
  message: string;
  error?: HttpError;
}
