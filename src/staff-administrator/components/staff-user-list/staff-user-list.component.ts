import { Component, OnInit } from '@angular/core';
import {StaffDataFilterService} from '../../services/staff-data-filter.service';

@Component({
  selector: 'exui-staff-user-list',
  templateUrl: './staff-user-list.component.html',
  styleUrls: ['./staff-user-list.component.scss']
})
export class StaffUserListComponent implements OnInit {
  public displayedColumns = ['name', 'services', 'locations', 'jobTitle', 'status'];

  constructor(public staffDataFilterService: StaffDataFilterService) { }

  public ngOnInit() {
  }

}
