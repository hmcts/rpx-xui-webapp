import { PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { CaseworkerDisplayName, DaysFromTodayPipe, YesNoPipe } from '.';
import { IntegerPipe } from './integer.pipe';
import { TwoDPPipe } from './two-dp.pipe';


// from containers
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ExuiCommonLibModule,
    FormsModule, // TODO: Remove this as it's only needed for testing.
    PipesModule
  ],
  declarations: [
    CaseworkerDisplayName,
    DaysFromTodayPipe,
    IntegerPipe,
    TwoDPPipe,
    YesNoPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CaseworkerDisplayName,
    DaysFromTodayPipe,
    IntegerPipe,
    TwoDPPipe,
    YesNoPipe
  ]
})
export class WorkAllocationPipesModule {

}
