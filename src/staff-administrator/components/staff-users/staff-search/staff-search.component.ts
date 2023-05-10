import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterConfig, FilterService } from '@hmcts/rpx-xui-common-lib';
import { Subscription } from 'rxjs';
import { InfoMessageCommService } from '../../../../app/shared/services/info-message-comms.service';
import { StaffDataFilterService } from '../services/staff-data-filter/staff-data-filter.service';

@Component({
  selector: 'exui-staff-search',
  templateUrl: './staff-search.component.html',
  styleUrls: ['./staff-search.component.scss']
})
export class StaffSearchComponent implements OnInit, OnDestroy {
  public filterConfig: FilterConfig;
  private readonly FILTER_NAME = 'staff-search-filter';
  private filterSub: Subscription;
  private filterErrorsSub: Subscription;

  constructor(
    private staffDataFilterService: StaffDataFilterService,
    private filterService: FilterService,
    private infoMessageCommService: InfoMessageCommService
  ) { }

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
        type: 'text-input'
      }],
      persistence: 'session',
      applyButtonText: 'Search',
      cancelButtonText: '',
      enableDisabledButton: false,
      showCancelFilterButton: false,
      applyButtonCallback: () => {
        this.infoMessageCommService.removeAllMessages();
      }
    };

    this.filterSub = this.filterService.getStream(this.FILTER_NAME)
      .subscribe((filterConfig) => {
        if (filterConfig) {
          const userPartialName = filterConfig.fields.find((item) => item.name === 'user-partial-name')?.value[0];
          if (userPartialName) {
            this.staffDataFilterService.search({
              partialName: userPartialName,
              pageNumber: 1,
              pageSize: StaffDataFilterService.PAGE_SIZE
            });
          }
        }
      });

    this.filterErrorsSub = this.filterService.givenErrors.subscribe((filterErrors) => {
      const errors = filterErrors ? [...filterErrors] : [];
      this.staffDataFilterService.setErrors([...errors]);
    });
  }

  public ngOnDestroy() {
    this.filterSub.unsubscribe();
    this.filterErrorsSub.unsubscribe();
  }
}
