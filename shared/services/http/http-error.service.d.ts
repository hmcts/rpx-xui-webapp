import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpError } from '../../domain/http';
import { AuthService } from '../auth';
export declare class HttpErrorService {
    private readonly authService;
    private static readonly CONTENT_TYPE;
    private static readonly JSON;
    private error;
    static convertToHttpError(error: HttpErrorResponse | any): HttpError;
    constructor(authService: AuthService);
    setError(error: HttpError): void;
    removeError(): HttpError;
    handle(error: HttpErrorResponse | any, redirectIfNotAuthorised?: boolean): Observable<never>;
}
