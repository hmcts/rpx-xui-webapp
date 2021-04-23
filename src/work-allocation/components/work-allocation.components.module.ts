import { PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

import * as fromComponents from '.';
import * as fromPipes from '../pipes';
import { CaseworkerDataService, InfoMessageCommService, LocationDataService } from '../services';

// from containers
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ExuiCommonLibModule.forChild(),
    FormsModule, // TODO: Remove this as it's only needed for testing.
    PipesModule
  ],
  declarations: [
    ...fromComponents.components,
    ...fromPipes.pipes
  ],
  providers: [CaseworkerDataService, LocationDataService, InfoMessageCommService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ...fromComponents.components,
    ...fromPipes.pipes
  ]
})
export class WorkAllocationComponentsModule {

}
