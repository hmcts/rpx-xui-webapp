import {Component} from '@angular/core';
import {Mode} from '../../../models/hearings.enum';
import {HEARING_ACTUAL_ADD_EDIT_SUMMARY_TEMPLATE} from '../../../templates/hearing-actual-add-edit-summary.template';

@Component({
  selector: 'exui-hearing-actuals-view-edit-parties',
  templateUrl: './hearing-actuals-view-edit-parties.component.html',
})
export class HearingActualsViewEditPartiesComponent {

  public template = HEARING_ACTUAL_ADD_EDIT_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW_EDIT;

}
