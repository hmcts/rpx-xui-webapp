import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestHomeComponent } from './containers/test-home.component';

const ROUTES = [{
  path: '',
  component: TestHomeComponent,
  children: []
}];

export const casesRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);

@NgModule({
    imports: [
        ExuiCommonLibModule,
        CommonModule,
        HttpClientModule,
        SharedModule,
        HttpModule,
        MatDialogModule,
        casesRouting
    ],
  declarations: [TestHomeComponent],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestComponentModule {

}
