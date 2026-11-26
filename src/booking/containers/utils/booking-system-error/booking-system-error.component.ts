import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-booking-system-error',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './booking-system-error.component.html',
})
export class BookingSystemErrorComponent {
  @Input() public error: string;
}
