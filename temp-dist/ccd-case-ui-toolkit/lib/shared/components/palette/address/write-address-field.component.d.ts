import { OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { FocusElementDirective } from '../../../directives/focus-element';
import { AddressesService } from '../../../services/addresses/addresses.service';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { WriteComplexFieldComponent } from '../complex/write-complex-field.component';
import { IsCompoundPipe } from '../utils/is-compound.pipe';
import { AddressOption } from './address-option.model';
import * as i0 from "@angular/core";
export declare class WriteAddressFieldComponent extends AbstractFieldWriteComponent implements OnInit, OnChanges {
    private readonly isCompoundPipe;
    writeComplexFieldComponent: WriteComplexFieldComponent;
    focusElementDirectives: QueryList<FocusElementDirective>;
    addressesService: AddressesService;
    formGroup: UntypedFormGroup;
    addressFormGroup: UntypedFormGroup;
    postcode: FormControl;
    addressList: FormControl;
    addressOptions: AddressOption[];
    missingPostcode: boolean;
    constructor(addressesService: AddressesService, isCompoundPipe: IsCompoundPipe);
    ngOnInit(): void;
    findAddress(): void;
    refocusElement(): void;
    blankAddress(): void;
    isComplexWithHiddenFields(): boolean;
    shouldShowDetailFields(): boolean;
    addressSelected(): void;
    ngOnChanges(changes: SimpleChanges): void;
    buildIdPrefix(elementId: string): string;
    private defaultLabel;
    private setFormValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteAddressFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteAddressFieldComponent, "ccd-write-address-field", never, { "formGroup": "formGroup"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=write-address-field.component.d.ts.map