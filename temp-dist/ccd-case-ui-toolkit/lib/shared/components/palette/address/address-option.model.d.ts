import { AddressModel } from '../../../domain/addresses/address.model';
export declare class AddressOption {
    description: string;
    value: AddressModel;
    constructor(addressModel: AddressModel, description: string);
    private getDescription;
    private prefixWithCommaIfPresent;
    private removeInitialCommaIfPresent;
}
//# sourceMappingURL=address-option.model.d.ts.map