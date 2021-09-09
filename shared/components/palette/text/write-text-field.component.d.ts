import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
export declare class WriteTextFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    textControl: FormControl;
    ngOnInit(): void;
}
