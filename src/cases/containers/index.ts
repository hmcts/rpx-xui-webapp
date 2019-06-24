import {CaseListComponent} from './case-list/case-list.component';
import {CaseFilterComponent} from './case-filter/case-filter.component';
import {CaseSearchComponent} from './case-search/case-search.component';
import {CasesCreateComponent} from './case-create/case-create.component';
import {CaseDetailsComponent} from './case-details/case-details.component';
import { CaseListFilterComponent } from './case-list-filter/case-list-filter.component';

export const containers: any[] = [
  CaseListComponent,
  CasesCreateComponent,
  CaseFilterComponent,
  CaseSearchComponent,
  CaseDetailsComponent,
  CaseListFilterComponent
];

export * from './case-list/case-list.component';
export * from './case-create/case-create.component';
export * from './case-filter/case-filter.component';
export * from './case-filter/case-filter.component';
export * from './case-details/case-details.component';
export * from './case-list-filter/case-list-filter.component';
