import { Component } from '@angular/core';
import { StaffDataFilterService } from '../../services/staff-data-filter.service';

@Component({
  selector: 'exui-staff-main-container',
  templateUrl: './staff-main-container.component.html',
  styleUrls: ['./staff-main-container.component.scss']
})
export class StaffMainContainerComponent {
  public advancedSearchEnabled = false;

  constructor(public staffDataFilterService: StaffDataFilterService) { }
}
