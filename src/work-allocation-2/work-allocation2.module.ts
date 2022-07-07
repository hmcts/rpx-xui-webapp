import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { AlertService, CaseUIToolkitModule, PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

import { SharedModule } from '../app/shared/shared.module';
import { RoleAccessModule } from '../role-access/role-access.module';
import { PriorityFieldComponentModule } from './components/priority-field/priority.module';
import { WorkAllocationComponentsModule } from './components/work-allocation.components.module';
import * as fromContainers from './containers';
import { WorkAllocationFeatureToggleGuard } from './guards';
import { CaseworkerDataService, WorkAllocationFeatureService, WorkAllocationTaskService } from './services';
import { workAllocationRouting } from './work-allocation-feature.routes';

// from containers
@NgModule({
  imports: [
    CaseUIToolkitModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule,
    WorkAllocationComponentsModule,
    PipesModule,
    workAllocationRouting,
    CdkTableModule,
    ExuiCommonLibModule,
    PriorityFieldComponentModule,
    ReactiveFormsModule,
    RoleAccessModule
  ],
  declarations: [...fromContainers.containers],
  providers: [
    WorkAllocationTaskService,
    WorkAllocationFeatureToggleGuard,
    AlertService,
    CaseworkerDataService,
    WorkAllocationFeatureService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkAllocationModule2 {
}
