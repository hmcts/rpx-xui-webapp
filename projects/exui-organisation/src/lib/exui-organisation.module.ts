import { NgModule } from '@angular/core';
import { ExuiOrganisationComponent } from './exui-organisation.component';
import { ExuiOrganisationLayoutComponent } from './containers/exui-organisation-layout/exui-organisation-layout.component';

@NgModule({
  declarations: [ExuiOrganisationComponent, ExuiOrganisationLayoutComponent],
  imports: [
  ],
  exports: [ExuiOrganisationComponent]
})
export class ExuiOrganisationModule { }
