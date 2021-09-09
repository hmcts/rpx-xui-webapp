import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
export declare class WriteEmailFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    emailControl: FormControl;
    ngOnInit(): void;
}
