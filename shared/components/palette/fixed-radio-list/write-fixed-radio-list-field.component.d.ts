import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
export declare class WriteFixedRadioListFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    fixedRadioListControl: FormControl;
    ngOnInit(): void;
}
