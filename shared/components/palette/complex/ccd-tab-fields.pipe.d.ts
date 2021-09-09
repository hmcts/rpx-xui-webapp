import { PipeTransform } from '@angular/core';
import { CaseTab } from '../../../domain/case-view';
import { CaseField } from '../../../domain/definition';
export declare class CcdTabFieldsPipe implements PipeTransform {
    transform(tab: CaseTab): CaseField;
}
