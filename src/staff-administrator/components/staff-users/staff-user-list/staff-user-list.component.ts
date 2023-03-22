import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pagination } from '@hmcts/rpx-xui-common-lib';
import { StaffDataFilterService } from '../services/staff-data-filter/staff-data-filter.service';

@Component({
  selector: 'exui-staff-user-list',
  templateUrl: './staff-user-list.component.html',
  styleUrls: ['./staff-user-list.component.scss']
})
export class StaffUserListComponent implements OnInit {
  public displayedColumns = ['name', 'services', 'locations', 'jobTitle'];
  public pagination: Pagination;
  public currentPageNumber?: number = 1;
  public pageTotalSize?: number;
  public noResultsFoundText = 'No results found';
  @Output() public pageChange = new EventEmitter();
  @Output() public paginationEvent = new EventEmitter<number>();

  constructor(public staffDataFilterService: StaffDataFilterService) { }

  public ngOnInit() {
    this.pagination = { itemsPerPage: 15, currentPage: this.currentPageNumber, totalItems: this.pageTotalSize };
  }

  public emitPageClickEvent(pageNumber: number) {
    this.currentPageNumber = pageNumber;
    this.pageChange.emit(pageNumber);
  }
}
