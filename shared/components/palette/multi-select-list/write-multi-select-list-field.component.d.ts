import { OnInit } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
export declare class WriteMultiSelectListFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    checkboxes: FormArray;
    ngOnInit(): void;
    onCheckChange(event: any): void;
    isSelected(code: any): AbstractControl;
}
