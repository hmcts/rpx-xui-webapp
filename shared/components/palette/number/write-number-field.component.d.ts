import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
export declare class WriteNumberFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    numberControl: FormControl;
    ngOnInit(): void;
}
