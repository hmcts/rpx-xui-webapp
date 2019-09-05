import { CaseHomeComponent } from './case-home/case-home.component';
import {CaseListComponent} from './case-list/case-list.component';
import {CaseFilterComponent} from './case-filter/case-filter.component';
import {CaseSearchComponent} from './case-search/case-search.component';
import {CasesCreateComponent} from './case-create/case-create.component';
import {CaseDetailsComponent} from './case-details/case-details.component';

export const containers: any[] = [
  CaseListComponent,
  CasesCreateComponent,
  CaseFilterComponent,
  CaseSearchComponent,
  CaseDetailsComponent,
  CaseHomeComponent
];

export * from './case-list/case-list.component';
export * from './case-create/case-create.component';
export * from './case-filter/case-filter.component';
export * from './case-filter/case-filter.component';
export * from './case-details/case-details.component';
export * from './case-home/case-home.component';
