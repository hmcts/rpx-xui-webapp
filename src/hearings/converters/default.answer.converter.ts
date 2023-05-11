import { Observable, of } from 'rxjs';
import { AnswerConverter } from './answer.converter';

export class DefaultAnswerConverter implements AnswerConverter {
  public transformAnswer(): Observable<string> {
    return of('Not implement yet');
  }
}
