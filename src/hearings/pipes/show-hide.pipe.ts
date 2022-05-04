import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultHiddenConverter } from '../converters/default.hidden.converter';
import { HiddenConverter } from '../converters/hidden.converter';
import { JudgeExclusionHiddenConverter } from '../converters/judge-exclusion.hidden.converter';
import { JudgeNameHiddenConverter } from '../converters/judge-name.hidden.converter';
import { JudgeTypesHiddenConverter } from '../converters/judge-types.hidden.converter';
import { ListedHiddenConverter } from '../converters/listed.hidden.converter';
import { NotListedHiddenConverter } from '../converters/not-listed.hidden.converter';
import { PanelExclusionHiddenConverter } from '../converters/panel-exclusion.hidden.converter';
import { PanelInclusionHiddenConverter } from '../converters/panel-inclusion.hidden.converter';
import { PanelRolesHiddenConverter } from '../converters/panel-roles.hidden.converter';
import { WelshHiddenConverter } from '../converters/welsh.hidden.converter';
import { IsHiddenSource } from '../models/hearings.enum';
import {LocationsDataService} from '../services/locations-data.service';
import { State } from '../store';

@Pipe({
  name: 'isHidden'
})
export class ShowHidePipe implements PipeTransform {

  constructor(protected readonly locationsDataService: LocationsDataService) {
  }

  public transform(isHiddenSource: IsHiddenSource, hearingState$: Observable<State>): Observable<boolean> {
    let converter: HiddenConverter = new DefaultHiddenConverter();
    switch (isHiddenSource) {
      case IsHiddenSource.WELSH_LOCATION:
        converter = new WelshHiddenConverter(this.locationsDataService);
        break;
      case IsHiddenSource.JUDGE_NAME:
        converter = new JudgeNameHiddenConverter();
        break;
      case IsHiddenSource.JUDGE_TYPES:
        converter = new JudgeTypesHiddenConverter();
        break;
      case IsHiddenSource.JUDGE_EXCLUSION:
        converter = new JudgeExclusionHiddenConverter();
        break;
      case IsHiddenSource.PANEL_INCLUSION:
        converter = new PanelInclusionHiddenConverter();
        break;
      case IsHiddenSource.PANEL_EXCLUSION:
        converter = new PanelExclusionHiddenConverter();
        break;
      case IsHiddenSource.PANEL_ROLES:
        converter = new PanelRolesHiddenConverter();
        break;
      case IsHiddenSource.LISTED:
        converter = new ListedHiddenConverter();
        break;
      case IsHiddenSource.NOT_LISTED:
        converter = new NotListedHiddenConverter();
        break;
      default:
        break;
    }
    return converter.transformHidden(hearingState$);
  }

}
