import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models';
import { ConfigConstants, FilterConstants, ListConstants, PageConstants, SortConstants } from '../../components/constants';
import { SortOrder } from '../../enums';
import { Caseworker, Location } from '../../interfaces/common';
import { FieldConfig, SortField } from '../../models/common';
import { PaginationParameter, SearchTaskRequest } from '../../models/dtos';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../utils';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';

@Component({
    selector: 'exui-all-work-tasks',
    templateUrl: 'all-work-task.component.html',
    styleUrls: ['all-work-task.component.scss']
})
export class AllWorkTaskComponent extends TaskListWrapperComponent {
  private selectedCaseworker: Caseworker;
  private selectedLocation: Location;
  public locations$: Observable<Location[]>;

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
    return this.isCurrentUserJudicial() ? ConfigConstants.AllWorkTasksForJudicial : ConfigConstants.AllWorkTasksForLegalOps;
  }

  public loadCaseWorkersAndLocations() {
    this.locations$ = this.locationService.getLocations();
  }

  public getSearchTaskRequestPagination(): SearchTaskRequest {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const userRole: UserRole = AppUtils.isLegalOpsOrJudicial(userInfo.roles);
      return {
        search_parameters: [
        this.getLocationParameter(),
        this.getCaseworkerParameter()
        ],
        sorting_parameters: [this.getSortParameter()],
        search_by: userRole === UserRole.Judicial ? 'judge' : 'caseworker',
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
    this.loadTasks();
  }
}
