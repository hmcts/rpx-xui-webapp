import { PipeTransform } from '@angular/core';
import { CaseField } from '../../../domain/definition/case-field.model';
export declare class FieldLabelPipe implements PipeTransform {
    transform(field: CaseField): string;
}
