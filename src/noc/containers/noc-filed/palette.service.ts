import { Injectable, Type } from '@angular/core';
import { NocQuestion } from '../../models';
import { NocTextFieldComponent } from './text';

@Injectable()
export class PaletteService {

  public getFieldComponentClass(questionField: NocQuestion, write: boolean): Type<{}> {
    switch (questionField.answer_field_type.type) {
      case 'Text':
        return NocTextFieldComponent;
      default:
        return NocTextFieldComponent;
    }
  }
}
