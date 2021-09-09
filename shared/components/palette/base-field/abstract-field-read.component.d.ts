import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractFormFieldComponent } from './abstract-form-field.component';
import { PaletteContext } from './palette-context.enum';
export declare abstract class AbstractFieldReadComponent extends AbstractFormFieldComponent implements OnInit {
    caseReference: string;
    topLevelFormGroup: FormGroup;
    /**
     * Optional. Enable context-aware rendering of fields.
     */
    context: PaletteContext;
    ngOnInit(): void;
}
