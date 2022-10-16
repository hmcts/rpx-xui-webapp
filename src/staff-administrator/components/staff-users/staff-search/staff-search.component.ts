import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StaffDataFilterService } from '../services/staff-data-filter/staff-data-filter.service';

@Component({
  selector: 'exui-staff-search',
  templateUrl: './staff-search.component.html',
  styleUrls: ['./staff-search.component.scss']
})
export class StaffSearchComponent implements OnInit {
  public userNameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public error = false;

export class StaffSearchComponent implements OnInit, OnDestroy {
  public filterConfig: FilterConfig;
  private readonly FILTER_NAME = 'staff-search-filter';
  private filterSub: Subscription;
  private filterErrorsSub: Subscription;

  constructor(private staffDataFilterService: StaffDataFilterService, private filterService: FilterService) { }

  public ngOnInit() {
    this.filterConfig = {
      id: this.FILTER_NAME,
      fields: [{
        name: 'user-partial-name',
        title: 'Search for a user by name',
        subTitle: '',
        options: [],
        minSelected: 3,
        minSelectedError: 'Enter staff details',
        displayMinSelectedError: true,
        maxSelected: 99,
        type: 'text-input',
      }],
      persistence: 'session',
      applyButtonText: 'Search',
      cancelButtonText: '',
      enableDisabledButton: false,
      showCancelFilterButton: false
    };

    this.filterSub = this.filterService.getStream(this.FILTER_NAME)
      .subscribe(filterConfig => {
        if (filterConfig) {
          const userPartialName = filterConfig.fields.find(item => item.name === 'user-partial-name').value[0];
          if (userPartialName) {
            this.staffDataFilterService.filterByPartialName(userPartialName).subscribe();
          }
        }
    });

    this.filterErrorsSub = this.filterService.givenErrors.subscribe((filterErrors) => {
      if (filterErrors && filterErrors.length) {
        this.staffDataFilterService.setErrors([...filterErrors]);
      }
    });
  }

  public ngOnDestroy() {
    this.filterSub.unsubscribe();
    this.filterErrorsSub.unsubscribe();
  }
}
