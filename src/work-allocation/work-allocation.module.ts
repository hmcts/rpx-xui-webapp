import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

import { SharedModule } from '../app/shared/shared.module';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { YesNoPipe } from './pipes';
import { workAllocationRouting } from './work-allocation-feature.routes';

// from containers
@NgModule({
    imports: [
        CommonModule,
        ExuiCommonLibModule,
        FormsModule, // TODO: Remove this as it's only needed for testing.
        HttpClientModule,
        SharedModule,
        HttpModule,
        MatDialogModule,
        workAllocationRouting
    ],
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers,
    YesNoPipe
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class WorkAllocationModule {

}
