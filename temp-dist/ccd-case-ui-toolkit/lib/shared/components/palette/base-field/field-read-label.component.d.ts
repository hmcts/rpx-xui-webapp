import { OnChanges, SimpleChanges } from '@angular/core';
import { AbstractFieldReadComponent } from './abstract-field-read.component';
import * as i0 from "@angular/core";
export declare class FieldReadLabelComponent extends AbstractFieldReadComponent implements OnChanges {
    canHaveGreyBar: boolean;
    withLabel: boolean;
    markdownUseHrefAsRouterLink?: boolean;
    isLabel(): boolean;
    isComplex(): boolean;
    isCaseLink(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    private fixCaseField;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldReadLabelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldReadLabelComponent, "ccd-field-read-label", never, { "withLabel": "withLabel"; "markdownUseHrefAsRouterLink": "markdownUseHrefAsRouterLink"; }, {}, never, ["*"], false, never>;
}
//# sourceMappingURL=field-read-label.component.d.ts.map