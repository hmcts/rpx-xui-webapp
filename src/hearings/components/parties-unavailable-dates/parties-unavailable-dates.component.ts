import { Component, Input } from '@angular/core';
import { AmendmentLabelStatus } from '../../../hearings/models/hearingsUpdateMode.enum';

@Component({
  standalone: false,
  selector: 'exui-parties-unavailable-dates',
  templateUrl: './parties-unavailable-dates.component.html',
  styleUrls: ['./parties-unavailable-dates.component.scss'],
})
export class PartiesUnavailableDatesComponent {
  @Input() public unAvailableDates: string[];
  @Input() public showAmendedLabel: boolean;

  public amendmentLabelEnum = AmendmentLabelStatus;
}
