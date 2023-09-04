import { OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
export declare class WriteDynamicMultiSelectListFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    checkboxes: FormArray;
    dynamicListFormControl: FormControl;
    ngOnInit(): void;
    onCheckChange(event: Event): void;
    isSelected(code: string): AbstractControl;
    private getValueListItem;
    private setInitialCaseList;
    private setInitialCaseFieldValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteDynamicMultiSelectListFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteDynamicMultiSelectListFieldComponent, "ccd-write-dynamic-multi-select-list-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=write-dynamic-multi-select-list-field.component.d.ts.map