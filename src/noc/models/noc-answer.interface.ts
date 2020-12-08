import { Observable } from 'rxjs';

export interface NocAnswer {
  question_id: string;
  question_text?: Observable<string>;
  value: string;
}
