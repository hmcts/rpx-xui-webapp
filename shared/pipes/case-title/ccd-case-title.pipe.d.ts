import { PipeTransform } from '@angular/core';
import { PlaceholderService } from '../../directives/substitutor/services/placeholder.service';
import { CaseField } from '../../domain/definition/case-field.model';
import { FieldsUtils } from '../../services/fields/fields.utils';
export declare class CcdCaseTitlePipe implements PipeTransform {
    private placeholderService;
    private fieldsUtils;
    constructor(placeholderService: PlaceholderService, fieldsUtils: FieldsUtils);
    transform(caseTitle: string, caseFields: CaseField[], values: any): any;
    private getReadOnlyAndFormFields;
}
