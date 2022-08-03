import { NoResultsComponent } from './no-results/no-results.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const containers: any[] = [
  SearchFormComponent,
  SearchResultsComponent,
  NoResultsComponent
];

export * from './search-form/search-form.component';
export * from './search-results/search-results.component';
export * from './no-results/no-results.component';
