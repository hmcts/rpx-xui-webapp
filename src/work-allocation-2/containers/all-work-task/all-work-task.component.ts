import { Caseworker, Location } from '../../interfaces/common';
import { Component } from '@angular/core';
import { ConfigConstants, FilterConstants, ListConstants, PageConstants, SortConstants } from '../../components/constants';
import { FieldConfig, SortField } from '../../models/common';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../utils';
import { PaginationParameter, SearchTaskRequest } from '../../models/dtos';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';
import { UserInfo } from '../../../app/models/user-details.model';
import { SortOrder } from '../../enums';

@Component({
    selector: 'exui-all-work-tasks',
    templateUrl: 'all-work-task.component.html',
    styleUrls: ['all-work-task.component.scss']
})
export class AllWorkTaskComponent extends TaskListWrapperComponent {
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
    return ListConstants.EmptyMessage.AllWork;
  }

  public get sortSessionKey(): string {
    return SortConstants.Session.AllWork;
  }

  public get pageSessionKey(): string {
    return PageConstants.Session.AllWork;
  }

  public get view(): string {
    return ListConstants.View.AllWork;
  }

  public get fields(): FieldConfig[] {
    return ConfigConstants.AllWorkTasks;
  }

  public loadCaseWorkersAndLocations() {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = [...locations];
    }, error => {
      handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
    });
  }

  public getSearchTaskRequestPagination(): SearchTaskRequest {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const isJudge = userInfo.roles.some(role => ListConstants.JUDGE_ROLES.includes(role));
      return {
        search_parameters: [
        this.getLocationParameter(),
        this.getCaseworkerParameter()
        ],
        sorting_parameters: [this.getSortParameter()],
        search_by: isJudge ? 'judge' : 'caseworker',
        pagination_parameters: this.getPaginationParameter()
      };
    }
  }

  private getLocationParameter() {
    let values: string[];
    if (this.selectedLocation && this.selectedLocation.id !== FilterConstants.Options.Locations.ALL.id) {
      values = [ this.selectedLocation.id ];
    } else {
      values = this.locations.map(loc => loc.id);
    }
    return { key: 'location', operator: 'IN', values };
  }

  private getCaseworkerParameter() {
    let values: string[];
    if (this.selectedCaseworker && this.selectedCaseworker !== FilterConstants.Options.Caseworkers.ALL) {
      if (this.selectedCaseworker === FilterConstants.Options.Caseworkers.UNASSIGNED) {
        values = [];
      } else {
        values = [this.selectedCaseworker.idamId];
      }
    } else {
      values = [];
    }
    return { key: 'user', operator: 'IN', values };
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
    this.loadTasks();
  }
}
