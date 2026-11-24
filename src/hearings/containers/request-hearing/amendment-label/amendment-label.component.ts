import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AmendmentLabelStatus } from '../../../../hearings/models/hearingsUpdateMode.enum';

@Component({
  standalone: false,
  selector: 'exui-amendment-label',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './amendment-label.component.html',
})
export class AmendmentLabelComponent {
  @Input() public displayLabel: AmendmentLabelStatus;
  public amendmentLabelEnum = AmendmentLabelStatus;
}
