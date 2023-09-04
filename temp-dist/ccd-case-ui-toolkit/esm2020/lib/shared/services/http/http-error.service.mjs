import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpError } from '../../domain/http/http-error.model';
import { AuthService } from '../auth/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "../auth/auth.service";
export class HttpErrorService {
    constructor(authService) {
        this.authService = authService;
    }
    static convertToHttpError(error) {
        if (error instanceof HttpError) {
            return error;
        }
        let httpError = new HttpError();
        if (error instanceof HttpErrorResponse) {
            if (error.headers
                && error.headers.get(HttpErrorService.CONTENT_TYPE)
                && error.headers.get(HttpErrorService.CONTENT_TYPE).indexOf(HttpErrorService.JSON) !== -1) {
                try {
                    httpError = HttpError.from(error);
                }
                catch (e) {
                    console.error(e, e.message);
                }
            }
            if (!httpError.status) {
                httpError.status = error.status;
            }
        }
        else if (error) {
            if (error.message) {
                httpError.message = error.message;
            }
            if (error.status) {
                httpError.status = error.status;
            }
        }
        return httpError;
    }
    setError(error) {
        this.error = error;
    }
    removeError() {
        const error = this.error;
        this.error = null;
        return error;
    }
    handle(error, redirectIfNotAuthorised = true) {
        console.error('Handling error in http error service.');
        console.error(error);
        const httpError = HttpErrorService.convertToHttpError(error);
        if (redirectIfNotAuthorised && (httpError.status === 401 || httpError.status === 403)) {
            this.authService.signIn();
        }
        return throwError(httpError);
    }
}
HttpErrorService.CONTENT_TYPE = 'Content-Type';
HttpErrorService.JSON = 'json';
HttpErrorService.ɵfac = function HttpErrorService_Factory(t) { return new (t || HttpErrorService)(i0.ɵɵinject(i1.AuthService)); };
HttpErrorService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HttpErrorService, factory: HttpErrorService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HttpErrorService, [{
        type: Injectable
    }], function () { return [{ type: i1.AuthService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9odHRwL2h0dHAtZXJyb3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBSW5ELE1BQU0sT0FBTyxnQkFBZ0I7SUFFM0IsWUFBNkIsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBRyxDQUFDO0lBTWxELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUE4QjtRQUM3RCxJQUFJLEtBQUssWUFBWSxTQUFTLEVBQUU7WUFDOUIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDaEMsSUFBSSxLQUFLLFlBQVksaUJBQWlCLEVBQUU7WUFDdEMsSUFBSSxLQUFLLENBQUMsT0FBTzttQkFDVixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7bUJBQ2hELEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDN0YsSUFBSTtvQkFDRixTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkM7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM3QjthQUNGO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUNqQztTQUNGO2FBQU0sSUFBSSxLQUFLLEVBQUU7WUFDaEIsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNqQixTQUFTLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDbkM7WUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUNqQztTQUNGO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxLQUFnQjtRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRU0sV0FBVztRQUNoQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUE4QixFQUFFLHVCQUF1QixHQUFHLElBQUk7UUFDMUUsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsTUFBTSxTQUFTLEdBQWMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEUsSUFBSSx1QkFBdUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDckYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMzQjtRQUNELE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7O0FBbkR1Qiw2QkFBWSxHQUFHLGNBQWMsQ0FBQztBQUM5QixxQkFBSSxHQUFHLE1BQU0sQ0FBQztnRkFMM0IsZ0JBQWdCO3NFQUFoQixnQkFBZ0IsV0FBaEIsZ0JBQWdCO3VGQUFoQixnQkFBZ0I7Y0FENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cEVycm9yIH0gZnJvbSAnLi4vLi4vZG9tYWluL2h0dHAvaHR0cC1lcnJvci5tb2RlbCc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL2F1dGgvYXV0aC5zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cEVycm9yU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHt9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQ09OVEVOVF9UWVBFID0gJ0NvbnRlbnQtVHlwZSc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEpTT04gPSAnanNvbic7XG5cbiAgcHJpdmF0ZSBlcnJvcjogSHR0cEVycm9yO1xuICBwdWJsaWMgc3RhdGljIGNvbnZlcnRUb0h0dHBFcnJvcihlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UgfCBhbnkpOiBIdHRwRXJyb3Ige1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvcikge1xuICAgICAgcmV0dXJuIGVycm9yO1xuICAgIH1cbiAgICBsZXQgaHR0cEVycm9yID0gbmV3IEh0dHBFcnJvcigpO1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IuaGVhZGVyc1xuICAgICAgICAgICYmIGVycm9yLmhlYWRlcnMuZ2V0KEh0dHBFcnJvclNlcnZpY2UuQ09OVEVOVF9UWVBFKVxuICAgICAgICAgICYmIGVycm9yLmhlYWRlcnMuZ2V0KEh0dHBFcnJvclNlcnZpY2UuQ09OVEVOVF9UWVBFKS5pbmRleE9mKEh0dHBFcnJvclNlcnZpY2UuSlNPTikgIT09IC0xKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaHR0cEVycm9yID0gSHR0cEVycm9yLmZyb20oZXJyb3IpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlLCBlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWh0dHBFcnJvci5zdGF0dXMpIHtcbiAgICAgICAgaHR0cEVycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICBodHRwRXJyb3IubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICAgIGh0dHBFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBodHRwRXJyb3I7XG4gIH1cblxuICBwdWJsaWMgc2V0RXJyb3IoZXJyb3I6IEh0dHBFcnJvcikge1xuICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVFcnJvcigpOiBIdHRwRXJyb3Ige1xuICAgIGNvbnN0IGVycm9yID0gdGhpcy5lcnJvcjtcbiAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSB8IGFueSwgcmVkaXJlY3RJZk5vdEF1dGhvcmlzZWQgPSB0cnVlKTogT2JzZXJ2YWJsZTxuZXZlcj4ge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0hhbmRsaW5nIGVycm9yIGluIGh0dHAgZXJyb3Igc2VydmljZS4nKTtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICBjb25zdCBodHRwRXJyb3I6IEh0dHBFcnJvciA9IEh0dHBFcnJvclNlcnZpY2UuY29udmVydFRvSHR0cEVycm9yKGVycm9yKTtcbiAgICBpZiAocmVkaXJlY3RJZk5vdEF1dGhvcmlzZWQgJiYgKGh0dHBFcnJvci5zdGF0dXMgPT09IDQwMSB8fCBodHRwRXJyb3Iuc3RhdHVzID09PSA0MDMpKSB7XG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLnNpZ25JbigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhyb3dFcnJvcihodHRwRXJyb3IpO1xuICB9XG59XG4iXX0=