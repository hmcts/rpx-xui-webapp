import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
export declare class WriteDateFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    dateControl: FormControl;
    ngOnInit(): void;
    isDateTime(): boolean;
}
