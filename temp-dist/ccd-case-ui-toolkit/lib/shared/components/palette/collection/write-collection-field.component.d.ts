import { OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Subscription } from 'rxjs';
import { CaseField } from '../../../domain/definition/case-field.model';
import { Profile } from '../../../domain/profile/profile.model';
import { ProfileNotifier } from '../../../services/profile/profile.notifier';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
declare type CollectionItem = {
    caseField: CaseField;
    item: any;
    prefix: string;
    index: number;
    container: UntypedFormGroup;
};
export declare class WriteCollectionFieldComponent extends AbstractFieldWriteComponent implements OnInit, OnDestroy {
    private readonly dialog;
    private readonly scrollToService;
    private readonly profileNotifier;
    caseFields: CaseField[];
    formGroup: UntypedFormGroup;
    formArray: FormArray;
    profile: Profile;
    profileSubscription: Subscription;
    private readonly items;
    readonly collItems: CollectionItem[];
    constructor(dialog: MatDialog, scrollToService: ScrollToService, profileNotifier: ProfileNotifier);
    ngOnInit(): void;
    ngOnDestroy(): void;
    buildCaseField(item: any, index: number, isNew?: boolean): CaseField;
    buildIdPrefix(index: number): string;
    isSearchFilter(): boolean;
    addItem(doScroll: boolean): void;
    private isCollectionDynamic;
    private newCaseField;
    private getContainer;
    private focusLastItem;
    private removeItem;
    private resetIds;
    itemLabel(index: number): string;
    isNotAuthorisedToCreate(): boolean;
    getCollectionPermission(field: CaseField, type: string): boolean;
    isNotAuthorisedToUpdate(index: any): boolean;
    hasUpdateAccess(role: any): boolean;
    isNotAuthorisedToDelete(index: number): boolean;
    openModal(i: number): void;
    /**
     * Applied full solution as part of EUI-3505
     */
    private getControlIdAt;
    private isCollectionOfSimpleType;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteCollectionFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteCollectionFieldComponent, "ccd-write-collection-field", never, { "caseFields": "caseFields"; "formGroup": "formGroup"; }, {}, never, never, false, never>;
}
export {};
//# sourceMappingURL=write-collection-field.component.d.ts.map