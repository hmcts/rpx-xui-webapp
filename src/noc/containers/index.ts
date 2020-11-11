import { NocCaseRefComponent } from './noc-case-ref/noc-case-ref.component';
import { NocErrorComponent } from './noc-errors/noc-error.component';
import { NocEmailFieldComponent } from './noc-filed/email';
import { NocFieldComponent } from './noc-filed/noc-field.component';
import { NocNumberFieldComponent } from './noc-filed/number';
import { NocPhoneUkFieldComponent } from './noc-filed/phone-uk';
import { NocPostcodeFieldComponent } from './noc-filed/postcode';
import { NocTextFieldComponent } from './noc-filed/text';
import { NocErrorPipe } from './noc-filed/utils';
import { NocYesNoFieldComponent } from './noc-filed/yes-no';
import { NocHomeComponent } from './noc-home/noc-home.component';
import { NocNavigationComponent } from './noc-navigation/noc-navigation.component';
import { NocQAndAComponent } from './noc-q-and-a/noc-q-and-a.component';

export const containers: any[] = [
  NocHomeComponent,
  NocNavigationComponent,
  NocErrorComponent,
  NocCaseRefComponent,
  NocQAndAComponent,
  NocFieldComponent,
  NocErrorPipe,
  NocTextFieldComponent,
  NocNumberFieldComponent,
  NocEmailFieldComponent,
  NocPhoneUkFieldComponent,
  NocYesNoFieldComponent,
  NocPostcodeFieldComponent
];

export * from './noc-home/noc-home.component';
export * from './noc-navigation/noc-navigation.component';
export * from './noc-errors/noc-error.component';
export * from './noc-case-ref/noc-case-ref.component';
export * from './noc-filed/noc-field.component';
export * from './noc-q-and-a/noc-q-and-a.component';
