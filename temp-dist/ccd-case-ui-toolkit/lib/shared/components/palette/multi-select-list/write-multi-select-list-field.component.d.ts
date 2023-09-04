import { OnInit } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
export declare class WriteMultiSelectListFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    checkboxes: FormArray;
    ngOnInit(): void;
    onCheckChange(event: any): void;
    isSelected(code: any): AbstractControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteMultiSelectListFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteMultiSelectListFieldComponent, "ccd-write-multi-select-list-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=write-multi-select-list-field.component.d.ts.map