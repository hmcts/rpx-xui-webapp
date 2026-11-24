import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-view-hearing',
  templateUrl: './view-hearing.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./view-hearing.component.scss'],
})
export class ViewHearingComponent {
  constructor(private readonly location: Location) {}

  public onBack(): void {
    this.location.back();
  }
}
