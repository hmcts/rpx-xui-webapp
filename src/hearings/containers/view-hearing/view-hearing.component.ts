import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-view-hearing',
  templateUrl: './view-hearing.component.html',
  styleUrls: ['./view-hearing.component.scss']

})
export class ViewHearingComponent {
  constructor(
    private readonly location: Location) {}

  public onBack(): void {
    this.location.back();
  }
}
