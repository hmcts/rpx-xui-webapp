import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'exui-view-hearing',
    templateUrl: './view-hearing.component.html',
    styleUrls: ['./view-hearing.component.scss'],
    standalone: false
})
export class ViewHearingComponent {
  constructor(
    private readonly location: Location) {}

  public onBack(): void {
    this.location.back();
  }
}
