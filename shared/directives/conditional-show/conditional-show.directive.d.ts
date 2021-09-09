import { AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CaseField } from '../../domain/definition/case-field.model';
import { ShowCondition } from './domain/conditional-show.model';
import { FieldsUtils } from '../../services/fields/fields.utils';
import { ConditionalShowRegistrarService } from './services/conditional-show-registrar.service';
import { GreyBarService } from './services/grey-bar.service';
export declare class ConditionalShowDirective implements AfterViewInit, OnDestroy {
    private el;
    private fieldsUtils;
    private registry;
    private renderer;
    private greyBarService;
    caseField: CaseField;
    idPrefix: string;
    contextFields: CaseField[];
    formGroup: FormGroup;
    greyBarEnabled: boolean;
    complexFormGroup: FormGroup;
    condition: ShowCondition;
    formField: any;
    formGroupRawValue: any;
    private formChangesSubscription;
    constructor(el: ElementRef, fieldsUtils: FieldsUtils, registry: ConditionalShowRegistrarService, renderer: Renderer2, greyBarService: GreyBarService);
    ngAfterViewInit(): void;
    refreshVisibility(): void;
    ngOnDestroy(): void;
    private subscribeToFormChanges;
    /**
     * returns whether the field visibility has changed, or undefined if not
     */
    private updateVisibility;
    private onHide;
    private onShow;
    private hideField;
    private showField;
    private shouldToggleToHide;
    private shouldToggleToShow;
    private buildPath;
    private getCurrentPagesReadOnlyAndFormFieldValues;
    private getFormFieldsValuesIncludingDisabled;
    private isHidden;
    private unsubscribeFromFormChanges;
    private checkHideShowCondition;
    private updateGreyBar;
}
