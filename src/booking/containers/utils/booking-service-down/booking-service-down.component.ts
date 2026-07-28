import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../app/shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'exui-booking-service-down',
  templateUrl: './booking-service-down.component.html',
})
export class BookingServiceDownComponent {
  @Input() public error: string;
}
