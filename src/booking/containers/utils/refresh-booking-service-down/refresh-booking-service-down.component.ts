import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'exui-refresh-booking-service-down',
  templateUrl: './refresh-booking-service-down.component.html'
})
export class RefreshBookingServiceDownComponent {
   @Input() public error: string;
}
