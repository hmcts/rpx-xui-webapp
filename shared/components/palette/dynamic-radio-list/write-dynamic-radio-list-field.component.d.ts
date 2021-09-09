import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
export declare class WriteDynamicRadioListFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    dynamicRadioListControl: FormControl;
    ngOnInit(): void;
    buildElementId(name: string): string;
}
