import { NocCaseRefComponent } from './noc-case-ref/noc-case-ref.component';
import { NocErrorComponent } from './noc-errors/noc-error.component';
import { NocFieldComponent } from './noc-filed/noc-field.component';
import { NocHomeComponent } from './noc-home/noc-home.component';
import { NocNavigationComponent } from './noc-navigation/noc-navigation.component';
import { NocQAndAComponent } from './noc-q-and-a/noc-q-and-a.component';
import { NocTextFieldComponent } from './noc-filed/text/noc-text-field.component';

export const containers: any[] = [
  NocHomeComponent,
  NocNavigationComponent,
  NocErrorComponent,
  NocCaseRefComponent,
  NocFieldComponent,
  NocTextFieldComponent,
  NocQAndAComponent
];

export * from './noc-home/noc-home.component';
export * from './noc-navigation/noc-navigation.component';
export * from './noc-errors/noc-error.component';
export * from './noc-case-ref/noc-case-ref.component';
export * from './noc-filed/noc-field.component';
export * from './noc-q-and-a/noc-q-and-a.component';
