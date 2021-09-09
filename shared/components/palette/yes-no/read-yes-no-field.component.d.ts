import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { OnInit } from '@angular/core';
import { YesNoService } from './yes-no.service';
export declare class ReadYesNoFieldComponent extends AbstractFieldReadComponent implements OnInit {
    private yesNoService;
    formattedValue: string;
    constructor(yesNoService: YesNoService);
    ngOnInit(): void;
}
