import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../../app.config';
import { Judicialworker } from '../../../domain/work-allocation/judicial-worker.model';
import { HttpErrorService } from '../../../services/http/http-error.service';
import { HttpService } from '../../../services/http/http.service';
import * as i0 from "@angular/core";
export declare class JudicialworkerService {
    private readonly http;
    private readonly appConfig;
    private readonly errorService;
    constructor(http: HttpService, appConfig: AbstractAppConfig, errorService: HttpErrorService);
    getJudicialworkers(userIds: string[], serviceId: string): Observable<Judicialworker[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JudicialworkerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JudicialworkerService>;
}
//# sourceMappingURL=judicial-worker.service.d.ts.map