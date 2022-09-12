import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StaffDataFilterService } from '../../services/staff-data-filter.service';

@Component({
  selector: 'exui-staff-search',
  templateUrl: './staff-search.component.html',
  styleUrls: ['./staff-search.component.scss']
})
export class StaffSearchComponent implements OnInit {
  public userNameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public error = false;

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
