import { ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CaseField } from '../../../domain/definition/case-field.model';
import { PaletteService } from '../palette.service';
import { AbstractFieldReadComponent } from './abstract-field-read.component';
import * as i0 from "@angular/core";
export declare class FieldReadComponent extends AbstractFieldReadComponent implements OnInit {
    private readonly resolver;
    private readonly paletteService;
    withLabel: boolean;
    formGroup: UntypedFormGroup;
    caseFields: CaseField[];
    markdownUseHrefAsRouterLink?: boolean;
    fieldContainer: ViewContainerRef;
    constructor(resolver: ComponentFactoryResolver, paletteService: PaletteService);
    ngOnInit(): void;
    private labelCanBeTranslated;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldReadComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldReadComponent, "ccd-field-read", never, { "withLabel": "withLabel"; "formGroup": "formGroup"; "caseFields": "caseFields"; "markdownUseHrefAsRouterLink": "markdownUseHrefAsRouterLink"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=field-read.component.d.ts.map