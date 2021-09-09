import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
export declare class WriteFixedListFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    fixedListFormControl: FormControl;
    readonly listItems: any[];
    ngOnInit(): void;
}
