import { OnInit } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { WriteComplexFieldComponent } from '../complex/write-complex-field.component';
import * as i0 from "@angular/core";
export declare class WriteCaseLinkFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    caseReferenceControl: AbstractControl;
    caseLinkGroup: UntypedFormGroup;
    writeComplexFieldComponent: WriteComplexFieldComponent;
    ngOnInit(): void;
    private caseReferenceValidator;
    private validCaseReference;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteCaseLinkFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteCaseLinkFieldComponent, "ccd-write-case-link-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=write-case-link-field.component.d.ts.map