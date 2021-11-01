import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
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
    CaseUIToolkitModule,
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
