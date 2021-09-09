import { Type } from '@angular/core';
import { CaseField } from '../../domain/definition/case-field.model';
export declare class PaletteService {
    getFieldComponentClass(caseField: CaseField, write: boolean): Type<{}>;
}
