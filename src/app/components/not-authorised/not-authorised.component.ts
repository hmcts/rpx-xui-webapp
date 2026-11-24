import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-not-authorised',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './not-authorised.component.html',
})
export class NotAuthorisedComponent {}
