import { PipeTransform } from '@angular/core';
import { CaseField } from '../../../domain/definition/case-field.model';
export declare class IsCompoundPipe implements PipeTransform {
    private static readonly COMPOUND_TYPES;
    private static readonly EXCLUDE;
    transform(field: CaseField): boolean;
}
