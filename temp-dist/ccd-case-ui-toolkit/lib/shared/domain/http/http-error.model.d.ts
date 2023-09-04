import { HttpErrorResponse } from '@angular/common/http';
export declare class HttpError {
    constructor();
    private static readonly DEFAULT_ERROR;
    private static readonly DEFAULT_MESSAGE;
    private static readonly DEFAULT_STATUS;
    timestamp: string;
    status: number;
    error: string;
    exception: string;
    message: string;
    path: string;
    details?: any;
    callbackErrors?: any;
    callbackWarnings?: any;
    static from(response: HttpErrorResponse): HttpError;
}
//# sourceMappingURL=http-error.model.d.ts.map