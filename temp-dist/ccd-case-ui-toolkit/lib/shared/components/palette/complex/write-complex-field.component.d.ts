import { OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CaseField } from '../../../domain/definition/case-field.model';
import { FormValidatorsService } from '../../../services/form/form-validators.service';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { IsCompoundPipe } from '../utils/is-compound.pipe';
import * as i0 from "@angular/core";
export declare class WriteComplexFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    private readonly isCompoundPipe;
    private readonly formValidatorsService;
    caseFields: CaseField[];
    formGroup: UntypedFormGroup;
    complexGroup: UntypedFormGroup;
    renderLabel: boolean;
    ignoreMandatory: boolean;
    complexFields: CaseField[];
    constructor(isCompoundPipe: IsCompoundPipe, formValidatorsService: FormValidatorsService);
    ngOnInit(): void;
    buildField(caseField: CaseField): CaseField;
    buildIdPrefix(field: CaseField): string;
    private addressValidatorsRequired;
    private isSmallAddressLine1;
    private isMandatory;
    private isAddressUK;
    private isTopLevelWithinCollection;
    private setupFields;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteComplexFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteComplexFieldComponent, "ccd-write-complex-type-field", never, { "caseFields": "caseFields"; "formGroup": "formGroup"; "renderLabel": "renderLabel"; "ignoreMandatory": "ignoreMandatory"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=write-complex-field.component.d.ts.map