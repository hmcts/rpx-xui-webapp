import { Component, Input } from '@angular/core';

@Component({
    selector: 'exui-booking-system-error',
    templateUrl: './booking-system-error.component.html',
    standalone: false
})
export class BookingSystemErrorComponent {
   @Input() public error: string;
}
