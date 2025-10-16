import { Component, Input } from '@angular/core';
import { AmendmentLabelStatus } from '../../../../hearings/models/hearingsUpdateMode.enum';

@Component({
  standalone: false,
  selector: 'exui-amendment-label',
  templateUrl: './amendment-label.component.html'

})
export class AmendmentLabelComponent {
  @Input() public displayLabel: AmendmentLabelStatus;
  public amendmentLabelEnum = AmendmentLabelStatus;
}
