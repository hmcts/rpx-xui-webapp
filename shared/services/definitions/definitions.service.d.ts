import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { CaseTypeLite, Jurisdiction } from '../../domain';
import { AbstractAppConfig as AppConfig } from '../../../app.config';
export declare class DefinitionsService {
    private http;
    private appConfig;
    constructor(http: HttpService, appConfig: AppConfig);
    getCaseTypes(jurisdictionId: string, access: string): Observable<CaseTypeLite[]>;
    getJurisdictions(access: string): Observable<Jurisdiction[]>;
}
