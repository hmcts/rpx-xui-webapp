import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {DefaultHiddenConverter} from '../converters/default.hidden.converter';
import {HiddenConverter} from '../converters/hidden.converter';
import { PanelFieldsHiddenConverter } from '../converters/panel.hidden.converter';
import {WelshHiddenConverter} from '../converters/welsh.hidden.converter';
import {IsHiddenSource} from '../models/hearings.enum';
import {State} from '../store';

@Pipe({
  name: 'isHidden'
})
export class ShowHidePipe implements PipeTransform {

  public transform(isHiddenSource: IsHiddenSource, hearingState$: Observable<State>): Observable<boolean> {
    let converter: HiddenConverter = new DefaultHiddenConverter();
    switch (isHiddenSource) {
      case IsHiddenSource.WELSH_LOCATION:
        converter = new WelshHiddenConverter();
        break;
      case IsHiddenSource.HEARING_PANEL_FIELD_SHOW_HIDE:
          converter = new PanelFieldsHiddenConverter();
          break;
      default:
        break;
    }
    return converter.transformHidden(hearingState$);
  }

}
