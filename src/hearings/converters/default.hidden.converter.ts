import { Observable, of } from 'rxjs';
import { HiddenConverter } from './hidden.converter';

export class DefaultHiddenConverter implements HiddenConverter {
  public transformHidden(): Observable<boolean> {
    return of(false);
  }
}
