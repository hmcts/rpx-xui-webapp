import CaseServiceConfig from '../../models/cases/case-service-config.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Case, CaseAction, InvokedCaseAction } from '../../models/cases';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FieldConfig, SortField } from '../../models/common';
import { ListConstants } from '../../components/constants';
import { PaginationParameter } from '../../models/dtos';
import { Router } from '@angular/router';
import { SortOrder } from '../../enums';


@Component({
  selector: 'exui-work-case-list',
  templateUrl: './work-case-list.component.html',
  styleUrls: ['work-case-list.component.scss']
})
export class WorkCaseListComponent implements OnChanges {

  /**
   * These are the cases & fields as returned from the WA Api.
   */
  @Input() public cases: Case[];
  @Input() public casesTotal: number;
  @Input() public caseServiceConfig: CaseServiceConfig;
  @Input() public sortedBy: SortField;
  @Input() public addActionsColumn: boolean = true;
  @Input() public pagination: PaginationParameter;
  @Input() public showManage = {};

  /**
   * The message to display when there are no cases to display in the list.
   */
  @Input() public emptyMessage: string = ListConstants.EmptyMessage.Default;

  // TODO: Need to re-read the LLD, but I believe it says pass in the caseServiceConfig into this CaseListComponent.
  // Therefore we will not need this.
  @Input() public fields: FieldConfig[];

  @Output() public sortEvent = new EventEmitter<string>();
  @Output() public paginationEvent = new EventEmitter<number>();
  @Output() public actionEvent = new EventEmitter<InvokedCaseAction>();

  /**
   * The datasource is an Observable of data to be displayed, as per LLD.
   */
  public dataSource$: Observable<Case[]>;

  public displayedColumns: string[];

  private selectedCase: Case;

  constructor(private readonly router: Router) {}

  public get showResetSortButton(): boolean {
    if (!this.sortedBy) {
      return false;
    }
    const { defaultSortFieldName, defaultSortDirection } = this.caseServiceConfig;
    if (this.sortedBy.fieldName === defaultSortFieldName && this.sortedBy.order === defaultSortDirection) {
      return false;
    }
    return true;
  }

  public selectCaseFromUrlHash(url: string): Case | null {
    if (url && this.cases) {
      const hashValue = url.substring(url.indexOf('#') + 1);
      if (hashValue && hashValue.indexOf('manage_') === 0) {
        const selectedCaseId = hashValue.replace('manage_', '');
        return this.cases.find(item => item.id === selectedCaseId) || null;
      }
    }
    return null;
  }

  public ngOnChanges(): void {
    if (this.cases) {
      this.dataSource$ = new BehaviorSubject(this.cases);
      this.setSelectedCase(this.selectCaseFromUrlHash(this.router.url));
      for (const item of this.cases) {
        if (item.actions && item.actions.length) {
          this.showManage[item.id] = item.actions.length > 0;
        }
      }
    }
    if (this.fields) {
      this.displayedColumns = this.getDisplayedColumn(this.fields);
    }
  }

  /**
   * Returns the columns to be displayed by the Angular Component Dev Kit table.
   *
   */
  public getDisplayedColumn(caseFieldConfig: FieldConfig[]): string[] {
    const fields: string[] = caseFieldConfig.map(field => field.name);
    return this.addActionsColumn ? this.addManageColumn(fields) : fields;
  }

  /**
   * Note that the fields we get from the WA Api will not contain a 'manage' field.
   *
   * Therefore we need to add the 'manage' column field within this component, as discussed in the LLD.
   */
  public addManageColumn(fields: string[]): string[] {
    return [...fields, 'manage'];
  }

  /**
   * Takes in the fieldname, so it can be output to trigger a new Request to the API
   * to get a sorted result set.
   *
   *
   * @param fieldName - ie. 'caseName'
   */
  public onSortHandler(fieldName: string): void {
    // emit the case sort field to get relevant information
    this.sortEvent.emit(fieldName);
  }

  /**
   * Trigger an event to the parent when the User clicks on a Manage action.
   */
  public onActionHandler(caseItem: Case, action: CaseAction): void {

    const invokedCaseAction: InvokedCaseAction = {
      invokedCase: caseItem,
      action
    };

    this.actionEvent.emit(invokedCaseAction);
  }

  /**
   * Set Selected Row
   *
   * Open and close the selected row.
   */
  public setSelectedCase(row: Case): void {
    if (row === this.selectedCase) {
      this.selectedCase = null;
    } else {
      this.selectedCase = row;
    }

    // Now change the URL to update the hash.
    this.setupHash();
  }

  public getSelectedCase(): Case {
    return this.selectedCase;
  }

  public isCaseSelected(item: Case): boolean {
    return item === this.selectedCase;
  }

  /**
   * Sorting happens outside of this component.
   *
   * CaseServiceConfig is passed into this component, and from this we're able to see how the table
   * has been sorted by the Work Allocation Api.
   *
   * We then set the sort table header to reflect this.
   *
   * 'ascending'/'descending' needed to set sorting instead of 'asc'/'desc' which does not sort correctly
   *
   * TODO: Think about moving 'none' to case sort model.
   *
   * @param fieldName - 'caseName'
   * @return 'none' / 'asc' / 'desc'
   */
  public getColumnSortedSetting(fieldName: string): string {
    // If we don't have an actual sortedBy value, default it now.
    if (!this.sortedBy) {
      this.setDefaultSort();
    }

    // If this is the field we're sorted by, return the appropriate order.
    if (this.sortedBy.fieldName === fieldName) {
      return this.sortedBy.order === SortOrder.ASC ? 'ascending' : 'descending';
    }

    // This field is not sorted, return NONE.
    return SortOrder.NONE;
  }

  public onResetSorting(): void {
    this.setDefaultSort();
    this.sortEvent.emit(this.sortedBy.fieldName);
  }

  private setDefaultSort(): void {
    const { defaultSortFieldName, defaultSortDirection } = this.caseServiceConfig;
    this.sortedBy = { fieldName: defaultSortFieldName, order: defaultSortDirection };
  }

  private setupHash(): void {
    if (this.addActionsColumn) {
      const currentPath = this.router.url || '';
      const basePath = currentPath.split('#')[0];
      if (this.selectedCase) {
        this.router.navigate([ basePath ], { fragment: `manage_${this.selectedCase.id}` });
      } else {
        this.router.navigate([ basePath ]);
      }
    }
  }

  private getCurrentPageIndex(): number {
    return (this.pagination ? this.pagination.page_number : 1) - 1;
  }

  private getCurrentCaseCount(): number {
    return this.cases ? this.cases.length : 0;
  }

  public getFirstResult(): number {
    return ((this.getCurrentPageIndex() * this.pagination.page_size) + (this.cases ? 1 : 0));
  }

  public getLastResult(): number {
    return ((this.getCurrentPageIndex() * this.pagination.page_size) + this.getCurrentCaseCount());
  }

}
