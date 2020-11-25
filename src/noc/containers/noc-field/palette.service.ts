import { Injectable, Type } from '@angular/core';
import { NocQuestion } from '../../models';
import { NocNumberFieldComponent } from './number';
import { NocTextFieldComponent } from './text';
import { NocEmailFieldComponent } from './email/noc-email-field.component';
import { NocPhoneUkFieldComponent } from './phone-uk/noc-phone-uk-field.component';
import { NocYesNoFieldComponent } from './yes-no';
import { NocPostcodeFieldComponent } from './postcode';
import { NocDateFieldComponent } from './date';
import { NocDateTimeFieldComponent } from './datetime';
import { NocTimeFieldComponent } from './time';

@Injectable()
export class PaletteService {

  public getFieldComponentClass(questionField: NocQuestion): Type<{}> {
    switch (questionField.answer_field_type.type) {
      case 'Text':
        return NocTextFieldComponent;
      case 'Number':
        return NocNumberFieldComponent;
      case 'Email':
        return NocEmailFieldComponent;
      case 'PhoneUK':
        return NocPhoneUkFieldComponent;
      case 'YesOrNo':
        return NocYesNoFieldComponent;
      case 'Postcode':
        return NocPostcodeFieldComponent;
      case 'Date':
        return NocDateFieldComponent;
      case 'DateTime':
        return NocDateTimeFieldComponent;
      case 'Time':
        return NocTimeFieldComponent;
      default:
        return NocTextFieldComponent;
    }
  }
}
