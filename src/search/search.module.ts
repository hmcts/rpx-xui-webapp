import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { SharedModule } from '../app/shared/shared.module';
import { NoResultsComponent } from './containers/no-results/no-results.component';
import { SearchFormComponent } from './containers/search-form/search-form.component';
import { SearchResultsComponent } from './containers/search-results/search-results.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    ExuiCommonLibModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchFormComponent,
    SearchResultsComponent,
    NoResultsComponent,
  ],
  exports: [
    SearchFormComponent,
    SearchResultsComponent,
    NoResultsComponent
  ],
  providers: [

  ]
})
export class SearchModule { }
