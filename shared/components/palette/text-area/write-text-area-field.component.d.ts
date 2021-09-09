import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BrowserService } from '../../../services/browser/browser.service';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
export declare class WriteTextAreaFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    private readonly browserService;
    textareaControl: FormControl;
    constructor(browserService: BrowserService);
    ngOnInit(): void;
    autoGrow(event: any): void;
}
