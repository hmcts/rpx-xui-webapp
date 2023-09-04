import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import { AddressModel } from '../../domain/addresses';
import { HttpService } from '../http';
import * as i0 from "@angular/core";
export declare class AddressesService {
    private readonly http;
    private readonly appConfig;
    constructor(http: HttpService, appConfig: AbstractAppConfig);
    getAddressesForPostcode(postcode: string): Observable<AddressModel[]>;
    private format;
    private formatAddressLines;
    private shiftAddressLinesUp;
    private toCapitalCase;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddressesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AddressesService>;
}
//# sourceMappingURL=addresses.service.d.ts.map