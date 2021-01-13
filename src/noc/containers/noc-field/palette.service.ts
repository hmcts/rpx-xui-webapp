import { Injectable, Type } from '@angular/core';
import { NocQuestion } from '../../models';
import { NocDateFieldComponent } from './date';
import { NocDateTimeFieldComponent } from './datetime';
import { NocEmailFieldComponent } from './email';
import { NocNumberFieldComponent } from './number';
import { NocPhoneUkFieldComponent } from './phone-uk';
import { NocPostcodeFieldComponent } from './postcode';
import { NocTextFieldComponent } from './text';
import { NocTimeFieldComponent } from './time';
import { NocYesNoFieldComponent } from './yes-no';

@Injectable()
export class PaletteService {

  public getFieldComponentClass(questionField: NocQuestion): Type<{}> {
    switch (questionField.answerFieldType.type) {
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
