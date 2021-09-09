import { PipeTransform } from '@angular/core';
import { CaseFieldService } from '../../../services/case-fields/case-field.service';
import { CaseField } from '../../../domain/definition/case-field.model';
export declare class IsReadOnlyPipe implements PipeTransform {
    private caseFieldService;
    constructor(caseFieldService: CaseFieldService);
    transform(field: CaseField): boolean;
}
