import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { YesNoService } from './yes-no.service';
import * as i0 from "@angular/core";
export declare class WriteYesNoFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    private readonly yesNoService;
    yesNoValues: string[];
    yesNoControl: FormControl;
    constructor(yesNoService: YesNoService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteYesNoFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteYesNoFieldComponent, "ccd-write-yes-no-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=write-yes-no-field.component.d.ts.map