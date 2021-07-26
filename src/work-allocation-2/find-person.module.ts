import { FindAPersonService } from './services/find-person.service';
import { FindPersonComponent } from './components/find-person/find-person.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../app/shared/shared.module';
import { MatAutocompleteModule, MatDialogModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
      CommonModule,
      HttpClientModule,
      SharedModule,
      MatDialogModule,
      CdkTableModule,
      FormsModule,
      ReactiveFormsModule,
      MatAutocompleteModule
    ],
    declarations: [FindPersonComponent],
    providers: [
      FindAPersonService
    ],
    exports: [FindPersonComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })

export class FindPersonModule {}
