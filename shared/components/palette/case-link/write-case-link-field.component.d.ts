import { OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { WriteComplexFieldComponent } from '../complex/write-complex-field.component';
export declare class WriteCaseLinkFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    caseReferenceControl: AbstractControl;
    caseLinkGroup: FormGroup;
    writeComplexFieldComponent: WriteComplexFieldComponent;
    ngOnInit(): void;
    private caseReferenceValidator;
    validCaseReference(valueString: string): boolean;
}
