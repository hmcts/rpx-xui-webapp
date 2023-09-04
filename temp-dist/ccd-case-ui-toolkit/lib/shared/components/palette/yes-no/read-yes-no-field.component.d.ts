import { OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { YesNoService } from './yes-no.service';
import * as i0 from "@angular/core";
export declare class ReadYesNoFieldComponent extends AbstractFieldReadComponent implements OnInit {
    private readonly yesNoService;
    formattedValue: string;
    constructor(yesNoService: YesNoService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReadYesNoFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReadYesNoFieldComponent, "ccd-read-yes-no-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=read-yes-no-field.component.d.ts.map