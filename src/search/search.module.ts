import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { SharedModule } from '../app/shared/shared.module';
import { SearchFormComponent } from './containers/search-form/search-form.component';
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
    SearchFormComponent
  ],
  exports: [
    SearchFormComponent
  ],
  providers: [

  ]
})
export class SearchModule { }
