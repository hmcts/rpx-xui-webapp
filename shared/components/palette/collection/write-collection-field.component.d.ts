import { OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Subscription } from 'rxjs';
import { CaseField } from '../../../domain/definition/case-field.model';
import { Profile } from '../../../domain/profile';
import { ProfileNotifier } from '../../../services';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
export declare class WriteCollectionFieldComponent extends AbstractFieldWriteComponent implements OnInit, OnDestroy {
    private readonly dialog;
    private readonly scrollToService;
    private readonly profileNotifier;
    caseFields: CaseField[];
    formGroup: FormGroup;
    formArray: FormArray;
    profile: Profile;
    profileSubscription: Subscription;
    private items;
    private collItems;
    constructor(dialog: MatDialog, scrollToService: ScrollToService, profileNotifier: ProfileNotifier);
    ngOnInit(): void;
    ngOnDestroy(): void;
    buildCaseField(item: any, index: number, isNew?: boolean): CaseField;
    private newCaseField;
    buildIdPrefix(index: number): string;
    private getContainer;
    isSearchFilter(): boolean;
    addItem(doScroll: boolean): void;
    private focusLastItem;
    private removeItem;
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
}
