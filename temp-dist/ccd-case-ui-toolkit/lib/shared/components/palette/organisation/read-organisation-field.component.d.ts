import { OnInit } from '@angular/core';
import { CaseField } from '../../../domain/definition';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { PaletteContext } from '../base-field/palette-context.enum';
import * as i0 from "@angular/core";
export declare class ReadOrganisationFieldComponent extends AbstractFieldReadComponent implements OnInit {
    caseFields: CaseField[];
    paletteContext: typeof PaletteContext;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReadOrganisationFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReadOrganisationFieldComponent, "ccd-read-organisation-field", never, { "caseFields": "caseFields"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=read-organisation-field.component.d.ts.map