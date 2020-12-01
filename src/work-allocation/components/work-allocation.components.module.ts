import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

import * as fromComponents from '.';
import * as fromPipes from '../pipes';

// from containers
@NgModule({
  imports: [
    CommonModule,
    ExuiCommonLibModule,
    FormsModule // TODO: Remove this as it's only needed for testing.
  ],
  declarations: [
    ...fromComponents.components,
    ...fromPipes.pipes
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ...fromComponents.components,
    ...fromPipes.pipes
  ]
})
export class WorkAllocationComponentsModule {

}
