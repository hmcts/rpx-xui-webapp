import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFormComponent } from './containers';
import { NoResultsComponent } from './containers/no-results/no-results.component';

const routes: Routes = [
  {
    path: '',
    component: SearchFormComponent,
  },
  {
    path: 'noresults',
    component: NoResultsComponent,
    data: {
      title: 'Search cases | No results'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
