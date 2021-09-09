import { OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { PaletteContext } from '../base-field/palette-context.enum';
import { CaseField } from '../../../domain/definition';
export declare class ReadComplexFieldComponent extends AbstractFieldReadComponent implements OnInit {
    caseFields: CaseField[];
    paletteContext: typeof PaletteContext;
    ngOnInit(): void;
}
