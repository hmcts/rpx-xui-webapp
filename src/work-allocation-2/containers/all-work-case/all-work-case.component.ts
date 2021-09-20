import { Component, OnInit } from '@angular/core';
import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models';
import { Actions } from '../../../role-access/models';
import { ConfigConstants, ListConstants, PageConstants, SortConstants } from '../../components/constants';
import { SortOrder } from '../../enums';
import { Location } from '../../interfaces/common';
import { InvokedCaseAction } from '../../models/cases';
import { FieldConfig, SortField } from '../../models/common';
import { PaginationParameter, SearchCaseRequest } from '../../models/dtos';
import { WorkCaseListWrapperComponent } from '../work-case-list-wrapper/work-case-list-wrapper.component';

@Component({
  selector: 'exui-all-work-cases',
  templateUrl: 'all-work-case.component.html',
  styleUrls: ['all-work-case.component.scss']
})
export class AllWorkCaseComponent extends WorkCaseListWrapperComponent implements OnInit {
  public sortedBy: SortField = {
    fieldName: '',
    order: SortOrder.NONE
  };
  public pagination: PaginationParameter = {
    page_number: 1,
    page_size: 25
  };
  private selectedJurisdiction: any = 'Immigration and Asylum';
  private selectedCaseName: string = '';
  private selectedRole: string = 'All';
  private selectedLocation: Location = {
    id: '231596',
    locationName: 'Birmingham',
    services: [],
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

  public ngOnInit(): void {
    this.setUpLocations();
    this.setupCaseWorkers();
  }

  public getSearchCaseRequestPagination(): SearchCaseRequest {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const userRole: UserRole = AppUtils.isLegalOpsOrJudicial(userInfo.roles);
      return {
        search_parameters: [
          {key: 'jurisdiction', operator: 'EQUAL', values: this.selectedJurisdiction},
          {key: 'location_id', operator: 'EQUAL', values: this.selectedLocation.id},
          {key: 'case_name', operator: 'EQUAL', values: this.selectedCaseName},
          {key: 'role', operator: 'EQUAL', values: this.selectedRole},
        ],
        sorting_parameters: [this.getSortParameter()],
        search_by: userRole,
        pagination_parameters: this.getPaginationParameter()
      };
    }
  }

  public onActionHandler(caseAction: InvokedCaseAction): void {
    let actionUrl = '';
    if (caseAction.action.id === Actions.Reallocate) {
      actionUrl = `role-access/allocate-role/${caseAction.action.id}?caseId=${caseAction.invokedCase.case_id}&roleCategory=${caseAction.invokedCase.roleCategory}&assignmentId=${caseAction.invokedCase.id}&userName=${caseAction.invokedCase.assignee}&typeOfRole=${caseAction.invokedCase.roleName}`;
    } else if (caseAction.action.id === Actions.Remove) {
      actionUrl = `role-access/allocate-role/${caseAction.action.id}?caseId=${caseAction.invokedCase.case_id}&assignmentId=${caseAction.invokedCase.id}`;
    }
    this.router.navigateByUrl(actionUrl);
  }

  /**
   * Handle the paging event
   */
  public onPaginationEvent(pageNumber: number): void {
    this.onPaginationHandler(pageNumber);
  }

  public onSelectionChanged(selection: { location_id: string, jurisdiction: string, case_name: string, role: string, person: string }): void {
    this.selectedLocation.id = selection.location_id === 'all' ? '' : selection.location_id;
    this.selectedJurisdiction = selection.jurisdiction;
    this.selectedCaseName = selection.case_name === 'All' ? '' : selection.person;
    this.selectedRole = selection.role;
    this.doLoad();
  }
}
