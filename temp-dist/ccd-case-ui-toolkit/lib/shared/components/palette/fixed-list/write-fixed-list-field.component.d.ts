import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
export declare class WriteFixedListFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    fixedListFormControl: FormControl;
    get listItems(): any[];
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteFixedListFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteFixedListFieldComponent, "ccd-write-fixed-list-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=write-fixed-list-field.component.d.ts.map