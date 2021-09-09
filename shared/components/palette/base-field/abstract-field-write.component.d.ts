import { OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CaseField } from '../../../domain';
import { AbstractFormFieldComponent } from './abstract-form-field.component';
export declare abstract class AbstractFieldWriteComponent extends AbstractFormFieldComponent implements OnChanges {
    isExpanded: boolean;
    isInSearchBlock: boolean;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    protected addValidators(caseField: CaseField, control: AbstractControl): void;
    private fixCaseField;
    createElementId(elementId: string): string;
}
