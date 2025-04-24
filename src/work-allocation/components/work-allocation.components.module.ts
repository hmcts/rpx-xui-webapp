import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyNativeDateModule as MatNativeDateModule } from '@angular/material/legacy-core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { RouterModule } from '@angular/router';
import { PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import * as fromComponents from '.';
import { WorkAllocationPipesModule } from '../pipes/work-allocation.pipes.module';
import { CaseworkerDataService, LocationDataService, WASupportedJurisdictionsService } from '../services';

// from containers
@NgModule({ declarations: [
        ...fromComponents.components
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        ...fromComponents.components
    ], imports: [CommonModule,
        ExuiCommonLibModule,
        RouterModule,
        FormsModule, // TODO: Remove this as it's only needed for testing.
        PipesModule,
        WorkAllocationPipesModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule], providers: [CaseworkerDataService, LocationDataService, WASupportedJurisdictionsService, provideHttpClient(withInterceptorsFromDi())] })
export class WorkAllocationComponentsModule {

}
