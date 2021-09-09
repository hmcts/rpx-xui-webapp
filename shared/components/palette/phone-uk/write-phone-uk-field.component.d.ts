import { OnInit } from '@angular/core';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { FormControl } from '@angular/forms';
export declare class WritePhoneUKFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    phoneUkControl: FormControl;
    ngOnInit(): void;
}
