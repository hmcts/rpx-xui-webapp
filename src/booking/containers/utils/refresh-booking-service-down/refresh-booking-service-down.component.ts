import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../app/shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'exui-refresh-booking-service-down',
  templateUrl: './refresh-booking-service-down.component.html',
})
export class RefreshBookingServiceDownComponent {
  @Input() public error: string;
}
