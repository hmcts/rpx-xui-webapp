import { OnInit } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { AbstractFormFieldComponent } from './abstract-form-field.component';
import { PaletteContext } from './palette-context.enum';
import * as i0 from "@angular/core";
export declare abstract class AbstractFieldReadComponent extends AbstractFormFieldComponent implements OnInit {
    caseReference: string;
    topLevelFormGroup: UntypedFormGroup | AbstractControl;
    /**
     * Optional. Enable context-aware rendering of fields.
     */
    context: PaletteContext;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AbstractFieldReadComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AbstractFieldReadComponent, never, never, { "caseReference": "caseReference"; "topLevelFormGroup": "topLevelFormGroup"; "context": "context"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=abstract-field-read.component.d.ts.map