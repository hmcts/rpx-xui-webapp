import { Component, Input } from '@angular/core';

@Component({
    selector: 'exui-booking-service-down',
    templateUrl: './booking-service-down.component.html',
    standalone: false
})
export class BookingServiceDownComponent {
   @Input() public error: string;
}
