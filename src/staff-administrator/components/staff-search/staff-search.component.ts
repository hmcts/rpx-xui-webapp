import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StaffDataFilterService } from '../../services/staff-data-filter.service';

@Component({
  selector: 'exui-staff-search',
  templateUrl: './staff-search.component.html',
  styleUrls: ['./staff-search.component.scss']
})
export class StaffSearchComponent implements OnInit {
  public error = false;
  public userNameControl = new FormControl();

  constructor(private staffDataFilterService: StaffDataFilterService) { }

  public ngOnInit() {
  }

  public onSearch() {
    this.error = false;

    if (this.userNameControl.valid) {
      this.staffDataFilterService.filterByPartialName(this.userNameControl.value).subscribe();
    } else {
      this.error = true;
      this.staffDataFilterService.setErrors([{
        error: 'Enter staff details',
        name: 'user-name',
      }]);
    }
  }
}
