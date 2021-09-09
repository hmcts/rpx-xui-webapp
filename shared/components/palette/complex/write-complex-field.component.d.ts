import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CaseField } from '../../../domain/definition';
import { FormValidatorsService } from '../../../services';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { IsCompoundPipe } from '../utils/is-compound.pipe';
export declare class WriteComplexFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    private isCompoundPipe;
    private formValidatorsService;
    caseFields: CaseField[];
    formGroup: FormGroup;
    complexGroup: FormGroup;
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
}
