import { ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CaseField } from '../../../domain/definition';
import { PaletteService } from '../palette.service';
import { AbstractFieldWriteComponent } from './abstract-field-write.component';
export declare class FieldWriteComponent extends AbstractFieldWriteComponent implements OnInit {
    private resolver;
    private paletteService;
    canHaveGreyBar: boolean;
    caseFields: CaseField[];
    fieldContainer: ViewContainerRef;
    constructor(resolver: ComponentFactoryResolver, paletteService: PaletteService);
    protected addValidators(caseField: CaseField, control: AbstractControl): void;
    ngOnInit(): void;
}
