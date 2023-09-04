import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpError } from '../../domain/http/http-error.model';
import { AuthService } from '../auth/auth.service';
import * as i0 from "@angular/core";
export declare class HttpErrorService {
    private readonly authService;
    constructor(authService: AuthService);
    private static readonly CONTENT_TYPE;
    private static readonly JSON;
    private error;
    static convertToHttpError(error: HttpErrorResponse | any): HttpError;
    setError(error: HttpError): void;
    removeError(): HttpError;
    handle(error: HttpErrorResponse | any, redirectIfNotAuthorised?: boolean): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpErrorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpErrorService>;
}
//# sourceMappingURL=http-error.service.d.ts.map