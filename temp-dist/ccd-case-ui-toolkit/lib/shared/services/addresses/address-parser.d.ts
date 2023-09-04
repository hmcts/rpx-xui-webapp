import { AddressModel } from '../../domain/addresses/address.model';
/**
 * Moving all this logic here into Address Parser class, so that it
 * will be easier for us when we move this parsing logic to into
 * `Shim` java service.
 */
export declare class AddressParser {
    parse(address: any): AddressModel;
    private parseAddressLine1;
    private parseAddressLine2;
    private parseAddressLine3;
    private removeNonAddressValues;
    private removeUndefinedString;
    private removeEmptySpaces;
    private removeInitialComma;
    private prefixWithCommaIfPresent;
}
//# sourceMappingURL=address-parser.d.ts.map