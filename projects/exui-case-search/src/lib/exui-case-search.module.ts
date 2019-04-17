import { NgModule } from '@angular/core';
import { ExuiCaseSearchComponent } from './exui-case-search.component';
import { ExuiCaseLayoutComponent } from './exui-case-layout/exui-case-layout.component';

@NgModule({
  declarations: [ExuiCaseSearchComponent, ExuiCaseLayoutComponent],
  imports: [
  ],
  exports: [ExuiCaseSearchComponent]
})
export class ExuiCaseSearchModule { }
