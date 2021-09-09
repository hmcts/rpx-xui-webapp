import { PipeTransform } from '@angular/core';
import { CaseField } from '../../../domain';
export declare class CcdCYAPageLabelFilterPipe implements PipeTransform {
    transform(caseFields: CaseField[]): CaseField[];
    private getNonLabelComplexFieldType;
}
