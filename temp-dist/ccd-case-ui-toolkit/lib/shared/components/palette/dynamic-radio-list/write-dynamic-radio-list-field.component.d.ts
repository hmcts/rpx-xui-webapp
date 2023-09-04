import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
export declare class WriteDynamicRadioListFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    dynamicRadioListControl: FormControl;
    ngOnInit(): void;
    createElementId(name: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteDynamicRadioListFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteDynamicRadioListFieldComponent, "ccd-write-dynamic-radio-list-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=write-dynamic-radio-list-field.component.d.ts.map