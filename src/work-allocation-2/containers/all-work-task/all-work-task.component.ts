import { Component, OnDestroy } from '@angular/core';
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
  private static ALL_TASKS = 'All';
  private static AVAILABLE_TASKS = 'None / Available tasks';
  private selectedLocation: Location = {
    id: '**ALL LOCATIONS**',
    locationName: '',
    services: [],
  };
  private selectedJurisdiction: any = 'Immigration and Asylum';
  private selectedTaskCategory: string = 'All';
  private selectedPerson: string = '';
  private selectedTaskType: string = 'All';
  private selectedPriority: string = 'All';
  public locations$: Observable<Location[]>;
  public locations: Location[];

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

  public loadCaseWorkersAndLocations(): void {
    this.locations$ = this.locationService.getLocations();
    this.locations$.subscribe(locations => this.locations = locations);
  }

  public getSearchTaskRequestPagination(): SearchTaskRequest {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const userRole: UserRole = AppUtils.isLegalOpsOrJudicial(userInfo.roles);
      return {
        search_parameters: [
          {key: 'jurisdiction', operator: 'EQUAL', values: [this.selectedJurisdiction]},
          this.getLocationParameter(),
          {key: 'taskCategory', operator: 'EQUAL', values: [this.selectedTaskCategory]},
          this.getPersonParameter(),
          {key: 'taskType', operator: 'EQUAL', values: [this.selectedTaskType]},
          {key: 'priority', operator: 'EQUAL', values: [this.selectedPriority]},
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

  private getPersonParameter() {
    if (this.selectedTaskCategory && this.selectedTaskCategory !== AllWorkTaskComponent.ALL_TASKS) {
      if (this.selectedTaskCategory === AllWorkTaskComponent.AVAILABLE_TASKS) {
        return { key: 'person', operator: 'IN', values: ['unassigned'] }
      } else {
        return { key: 'person', operator: 'IN', values: [this.selectedPerson]}
      }
    }
    return { key: 'person', operator: 'IN', values: [] };
  }

  /**
   * Handle the paging event
   */
   public onPaginationEvent(pageNumber: number): void {
    this.onPaginationHandler(pageNumber);
  }

  public onSelectionChanged(selection: {location: string, jurisdiction: string, selectPerson: string, person: string, taskType: string, priority: string }): void {
    this.selectedLocation.id = selection.location;
    this.selectedJurisdiction = selection.jurisdiction;
    this.selectedTaskCategory = selection.selectPerson;
    this.selectedPerson = selection.person;
    this.selectedTaskType = selection.taskType;
    this.selectedPriority = selection.priority && !this.isCurrentUserJudicial() ? selection.priority : '';
    this.loadTasks();
  }
}
