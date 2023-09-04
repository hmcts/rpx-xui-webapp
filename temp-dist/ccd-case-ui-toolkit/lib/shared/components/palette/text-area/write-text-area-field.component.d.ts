import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BrowserService } from '../../../services/browser/browser.service';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
export declare class WriteTextAreaFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    private readonly browserService;
    textareaControl: FormControl;
    constructor(browserService: BrowserService);
    ngOnInit(): void;
    autoGrow(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteTextAreaFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteTextAreaFieldComponent, "ccd-write-text-area-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=write-text-area-field.component.d.ts.map