import { Observable, of } from 'rxjs';
import { IsAmendedConverter } from './is-amended.converter';

export class DefaultAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(): Observable<boolean> {
    return of(false);
  }
}
