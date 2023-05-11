import { Component } from '@angular/core';
import { StaffDataFilterService } from '../services/staff-data-filter/staff-data-filter.service';

@Component({
  selector: 'exui-staff-user-list',
  templateUrl: './staff-user-list.component.html',
  styleUrls: ['./staff-user-list.component.scss']
})
export class StaffUserListComponent {
  public displayedColumns = ['name', 'services', 'locations', 'jobTitle'];
  public noResultsFoundText = 'No results found';

  constructor(public staffDataFilterService: StaffDataFilterService) { }

  public emitPageClickEvent(pageNumber: number) {
    this.staffDataFilterService.changePage(pageNumber);
  }
}
