import { ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CaseField } from '../../../domain/definition';
import { PaletteService } from '../palette.service';
import { AbstractFieldWriteComponent } from './abstract-field-write.component';
import * as i0 from "@angular/core";
export declare class FieldWriteComponent extends AbstractFieldWriteComponent implements OnInit {
    private readonly resolver;
    private readonly paletteService;
    canHaveGreyBar: boolean;
    caseFields: CaseField[];
    fieldContainer: ViewContainerRef;
    constructor(resolver: ComponentFactoryResolver, paletteService: PaletteService);
    protected addValidators(caseField: CaseField, control: AbstractControl): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldWriteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldWriteComponent, "ccd-field-write", never, { "caseFields": "caseFields"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=field-write.component.d.ts.map