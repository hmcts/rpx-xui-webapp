import { PipeTransform } from '@angular/core';
import { CaseFieldService } from '../../../services/case-fields';
import { CaseField } from '../../../domain/definition';
export declare class IsReadOnlyAndNotCollectionPipe implements PipeTransform {
    private caseFieldService;
    constructor(caseFieldService: CaseFieldService);
    transform(field: CaseField): boolean;
    private isCollection;
}
