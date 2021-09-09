import { Observable } from 'rxjs/Observable';
import { AbstractAppConfig } from '../../../app.config';
import { AddressModel } from '../../domain/addresses';
import { HttpService } from '../http';
export declare class AddressesService {
    private http;
    private appConfig;
    static readonly DPA = "DPA";
    static readonly UK = "United Kingdom";
    static readonly RD06 = "RD06";
    constructor(http: HttpService, appConfig: AbstractAppConfig);
    getAddressesForPostcode(postcode: string): Observable<Array<AddressModel>>;
    private format;
    private formatAddressLines;
    private shiftAddressLinesUp;
    private toCapitalCase;
}
