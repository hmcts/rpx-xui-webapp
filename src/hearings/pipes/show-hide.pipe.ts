import {Pipe, PipeTransform} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AbstractHiddenConverter} from '../converters/abstract.hidden.converter';
import {DefaultHiddenConverter} from '../converters/default.hidden.converter';
import {WelshHiddenConverter} from '../converters/welsh.hidden.converter';
import {IsHiddenSource} from '../models/hearings.enum';
import * as fromHearingStore from '../store';

@Pipe({
  name: 'isHidden'
})
export class ShowHidePipe implements PipeTransform {

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public transform(isHiddenSource: IsHiddenSource): Observable<boolean> {
    let converter: AbstractHiddenConverter = new DefaultHiddenConverter(this.hearingStore);
    switch (isHiddenSource) {
      case IsHiddenSource.WELSH_LOCATION:
        converter = new WelshHiddenConverter(this.hearingStore);
        break;
      default:
        break;
    }
    return converter.transformHidden();
  }

}
