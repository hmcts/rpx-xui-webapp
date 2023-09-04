import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
export declare class WriteTextFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    textControl: FormControl;
    ngOnInit(): void;
    onBlur($event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteTextFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteTextFieldComponent, "ccd-write-text-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=write-text-field.component.d.ts.map