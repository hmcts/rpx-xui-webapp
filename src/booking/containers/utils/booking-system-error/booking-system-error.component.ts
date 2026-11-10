import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../app/shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'exui-booking-system-error',
  templateUrl: './booking-system-error.component.html',
})
export class BookingSystemErrorComponent {
  @Input() public error: string;
}
