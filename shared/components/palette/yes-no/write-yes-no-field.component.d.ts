import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { YesNoService } from './yes-no.service';
export declare class WriteYesNoFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    private yesNoService;
    yesNoValues: string[];
    yesNoControl: FormControl;
    constructor(yesNoService: YesNoService);
    ngOnInit(): void;
}
