import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-refresh-booking-service-down',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './refresh-booking-service-down.component.html',
})
export class RefreshBookingServiceDownComponent {
  @Input() public error: string;
}
