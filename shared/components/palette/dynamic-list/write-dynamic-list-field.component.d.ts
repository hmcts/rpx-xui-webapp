import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
export declare class WriteDynamicListFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    dynamicListFormControl: FormControl;
    ngOnInit(): void;
}
