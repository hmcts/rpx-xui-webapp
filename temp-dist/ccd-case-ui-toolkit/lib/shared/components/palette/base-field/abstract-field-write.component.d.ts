import { OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CaseField } from '../../../domain/definition/case-field.model';
import { AbstractFormFieldComponent } from './abstract-form-field.component';
import * as i0 from "@angular/core";
export declare abstract class AbstractFieldWriteComponent extends AbstractFormFieldComponent implements OnChanges {
    isExpanded: boolean;
    isInSearchBlock: boolean;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    createElementId(elementId: string): string;
    protected addValidators(caseField: CaseField, control: AbstractControl): void;
    private fixCaseField;
    static ɵfac: i0.ɵɵFactoryDeclaration<AbstractFieldWriteComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AbstractFieldWriteComponent, never, never, { "isExpanded": "isExpanded"; "isInSearchBlock": "isInSearchBlock"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=abstract-field-write.component.d.ts.map