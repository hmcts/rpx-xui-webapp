import { Component, Input } from '@angular/core';

@Component({
  selector: 'exui-parties-unavailable-dates',
  templateUrl: './parties-unavailable-dates.component.html',
})
export class PartiesUnavailableDatesComponent {
  @Input()
  public unAvailableDates: string[];

}
