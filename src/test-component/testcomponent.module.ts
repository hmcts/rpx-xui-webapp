import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
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
        CommonModule,
        HttpClientModule,
        SharedModule,
        HttpModule,
        MatDialogModule,
        casesRouting
    ],
  declarations: [TestHomeComponent],
  providers: [
  ]
})
export class TestComponentModule {

}
