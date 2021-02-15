import { NocAffirmationComponent } from './noc-affirmation/noc-affirmation.component';
import { NocAnswerErrorComponent } from './noc-answer-error/noc-answer-error.component';
import { NocCaseRefComponent } from './noc-case-ref/noc-case-ref.component';
import { NocCheckAndSubmitComponent } from './noc-check-and-submit/noc-check-and-submit.component';
import { NocCheckYourAnswersComponent } from './noc-check-your-answers/noc-check-your-answers.component';
import { NocErrorComponent } from './noc-errors/noc-error.component';
import { NocEmailFieldComponent } from './noc-field/email';
import { NocFieldComponent } from './noc-field/noc-field.component';
import { NocNumberFieldComponent } from './noc-field/number';
import { NocPhoneUkFieldComponent } from './noc-field/phone-uk';
import { NocPostcodeFieldComponent } from './noc-field/postcode';
import { NocTextFieldComponent } from './noc-field/text';
import { NocYesNoFieldComponent } from './noc-field/yes-no';
import { NocDateFieldComponent } from './noc-field/date';
import { NocDateTimeFieldComponent } from './noc-field/datetime';
import { NocTimeFieldComponent } from './noc-field/time';
import { NocHomeComponent } from './noc-home/noc-home.component';
import { NocNavigationComponent } from './noc-navigation/noc-navigation.component';
import { NocQAndAComponent } from './noc-q-and-a/noc-q-and-a.component';
import { NocSubmitSuccessComponent } from './noc-submit-success/noc-submit-success.component';

export const containers: any[] = [
  NocHomeComponent,
  NocNavigationComponent,
  NocErrorComponent,
  NocCaseRefComponent,
  NocQAndAComponent,
  NocAnswerErrorComponent,
  NocCheckYourAnswersComponent,
  NocCheckAndSubmitComponent,
  NocAffirmationComponent,
  NocSubmitSuccessComponent,
  NocFieldComponent,
  NocTextFieldComponent,
  NocNumberFieldComponent,
  NocEmailFieldComponent,
  NocPhoneUkFieldComponent,
  NocYesNoFieldComponent,
  NocPostcodeFieldComponent,
  NocDateFieldComponent,
  NocDateTimeFieldComponent,
  NocTimeFieldComponent
];

export * from './noc-home/noc-home.component';
export * from './noc-navigation/noc-navigation.component';
export * from './noc-errors/noc-error.component';
export * from './noc-field/noc-field.component';
