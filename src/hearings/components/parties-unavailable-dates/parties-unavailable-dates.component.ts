import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exui-parties-unavailable-dates',
  templateUrl: './parties-unavailable-dates.component.html',
  styleUrls: ['./parties-unavailable-dates.component.scss']
})
export class PartiesUnavailableDatesComponent {
  @Input()
  public unAvailableDates: string[];

}
