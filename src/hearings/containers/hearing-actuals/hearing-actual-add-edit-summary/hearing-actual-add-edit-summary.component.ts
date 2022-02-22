import {Component} from '@angular/core';
import {Mode} from '../../../models/hearings.enum';
import {HEARING_ACTUAL_ADD_EDIT_SUMMARY_TEMPLATE} from '../../../templates/hearing-actual-add-edit-summary.template';

@Component({
  selector: 'exui-hearing-actual-add-edit-summary',
  templateUrl: './hearing-actual-add-edit-summary.component.html',
})
export class HearingActualAddEditSummaryComponent {

  public template = HEARING_ACTUAL_ADD_EDIT_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW_EDIT;

}
