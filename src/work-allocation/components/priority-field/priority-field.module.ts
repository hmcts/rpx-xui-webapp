import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PriorityFieldCurrentComponent } from './priority-field-current/priority-field-current.component';
import { PriorityFieldLegacyComponent } from './priority-field-legacy/priority-field-legacy.component';
import { PriorityFieldComponent } from './priority-field.component';

@NgModule({
  declarations: [
    PriorityFieldCurrentComponent,
    PriorityFieldLegacyComponent,
    PriorityFieldComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PriorityFieldComponent]
})
export class PriorityFieldModule { }
