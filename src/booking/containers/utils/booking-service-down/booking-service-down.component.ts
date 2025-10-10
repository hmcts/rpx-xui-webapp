import { Component, Input } from '@angular/core';

@Component({
  standalone: false,

  selector: 'exui-booking-service-down',
  templateUrl: './booking-service-down.component.html'

})
export class BookingServiceDownComponent {
   @Input() public error: string;
}
