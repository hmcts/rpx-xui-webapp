import { Component, Input } from '@angular/core';

@Component({
    selector: 'exui-refresh-booking-service-down',
    templateUrl: './refresh-booking-service-down.component.html',
    standalone: false
})
export class RefreshBookingServiceDownComponent {
   @Input() public error: string;
}
