import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-booking-service-down',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './booking-service-down.component.html',
})
export class BookingServiceDownComponent {
  @Input() public error: string;
}
