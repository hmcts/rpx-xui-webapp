import { Component } from '@angular/core';
import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models';
import { ConfigConstants, FilterConstants, ListConstants, PageConstants, SortConstants } from '../../components/constants';
import { SortOrder } from '../../enums';
import { Caseworker, Location } from '../../interfaces/common';
import { FieldConfig, SortField } from '../../models/common';
import { PaginationParameter, SearchCaseRequest } from '../../models/dtos';
import { WorkCaseListWrapperComponent } from '../work-case-list-wrapper/work-case-list-wrapper.component';

@Component({
    selector: 'exui-all-work-cases',
    templateUrl: 'all-work-case.component.html',
    styleUrls: ['all-work-case.component.scss']
})
export class AllWorkCaseComponent extends WorkCaseListWrapperComponent {
  private selectedCaseworker: Caseworker;
  private selectedLocation: Location;

  public sortedBy: SortField = {
    fieldName: '',
    order: SortOrder.NONE
  };

  public pagination: PaginationParameter = {
    page_number: 1,
    page_size: 25
  };
  public get emptyMessage(): string {
    return ListConstants.EmptyMessage.AllWorkCases;
  }

  public get sortSessionKey(): string {
    return SortConstants.Session.AllWorkCases;
  }

  public get pageSessionKey(): string {
    return PageConstants.Session.AllWorkCases;
  }

  public get view(): string {
    return ListConstants.View.AllWorkCases;
  }

  public get fields(): FieldConfig[] {
    return ConfigConstants.AllWorkCases;
  }

  public getSearchCaseRequestPagination(): SearchCaseRequest {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const userRole: UserRole = AppUtils.isLegalOpsOrJudicial(userInfo.roles);
      return {
        search_parameters: [],
        sorting_parameters: [this.getSortParameter()],
        search_by: userRole,
        pagination_parameters: this.getPaginationParameter()
      };
    }
  }

  private getCaseworkerParameter() {
    let values: string[];
    let key = 'user';
    if (this.selectedCaseworker && this.selectedCaseworker !== FilterConstants.Options.Caseworkers.ALL) {
      if (this.selectedCaseworker === FilterConstants.Options.Caseworkers.UNASSIGNED) {
        key = 'state';
        values = ['unassigned'];
      } else {
        values = [this.selectedCaseworker.idamId];
      }
    } else {
      values = [];
    }
    return { key, operator: 'IN', values };
  }

  /**
   * Handle the paging event
   */
   public onPaginationEvent(pageNumber: number): void {
    this.onPaginationHandler(pageNumber);
  }

  public onSelectionChanged(selection: { location: Location, caseworker: Caseworker }): void {
    this.selectedLocation = selection.location;
    this.selectedCaseworker = selection.caseworker;
    // this.loadTasks();
  }
}
