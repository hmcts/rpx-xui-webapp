import { NocCaseRefComponent } from './noc-case-ref/noc-case-ref.component';
import { NocErrorComponent } from './noc-errors/noc-error.component';
import { NocEmailFieldComponent } from './noc-field/email';
import { NocFieldComponent } from './noc-field/noc-field.component';
import { NocNumberFieldComponent } from './noc-field/number';
import { NocPhoneUkFieldComponent } from './noc-field/phone-uk';
import { NocPostcodeFieldComponent } from './noc-field/postcode';
import { NocTextFieldComponent } from './noc-field/text';
import { NocErrorPipe } from './noc-field/utils';
import { NocYesNoFieldComponent } from './noc-field/yes-no';
import { NocHomeComponent } from './noc-home/noc-home.component';
import { NocNavigationComponent } from './noc-navigation/noc-navigation.component';
import { NocQAndAComponent } from './noc-q-and-a/noc-q-and-a.component';
import { NocCheckAndSubmitComponent } from './noc-check-and-submit/noc-check-and-submit.component';
import { NocCheckYourAnswersComponent } from './noc-check-your-answers/noc-check-your-answers.component';

export const containers: any[] = [
  NocHomeComponent,
  NocNavigationComponent,
  NocErrorComponent,
  NocCaseRefComponent,
  NocQAndAComponent,
  NocCheckYourAnswersComponent,
  NocCheckAndSubmitComponent,
  NocFieldComponent,
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
export * from './noc-field/noc-field.component';
export * from './noc-q-and-a/noc-q-and-a.component';
export * from './noc-check-your-answers/noc-check-your-answers.component';
export * from './noc-check-and-submit/noc-check-and-submit.component';
