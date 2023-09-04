import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ErrorHandlerService {
    constructor();
    handleError(err: HttpErrorResponse): Observable<any>;
    getServerErrorMessage(isErrorExist: any, isDataNotExist?: boolean, error?: string): {
        title: string;
        body: string;
        showError: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<ErrorHandlerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ErrorHandlerService>;
}
//# sourceMappingURL=error-handler.service.d.ts.map