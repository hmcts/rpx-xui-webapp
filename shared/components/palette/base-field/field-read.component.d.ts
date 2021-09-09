import { ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CaseField } from '../../../domain/definition/case-field.model';
import { PaletteService } from '../palette.service';
import { AbstractFieldReadComponent } from './abstract-field-read.component';
export declare class FieldReadComponent extends AbstractFieldReadComponent implements OnInit {
    private resolver;
    private paletteService;
    withLabel: boolean;
    formGroup: FormGroup;
    caseFields: CaseField[];
    fieldContainer: ViewContainerRef;
    constructor(resolver: ComponentFactoryResolver, paletteService: PaletteService);
    ngOnInit(): void;
}
