import { NocError } from './noc-error.interface';

export interface NocHttpError {
  headers?: any;
  status: number;
  statusText?: string;
  url?: string;
  ok?: boolean;
  name?: string;
  message: string;
  error?: NocError;
}
