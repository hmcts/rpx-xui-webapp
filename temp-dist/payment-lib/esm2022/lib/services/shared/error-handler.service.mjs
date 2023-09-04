import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import * as i0 from "@angular/core";
export class ErrorHandlerService {
    constructor() { }
    handleError(err) {
        let errorMessage;
        if (err.error instanceof Error) {
            // A client-side or network error occurred.
            errorMessage = `An error occurred: ${err.error.message}`;
        }
        else {
            // The backend returned an unsuccessful response code.
            if (err.status === 404) {
                if (typeof err.error === 'string' && err.error !== undefined) {
                    if (err.error.length > 60) {
                        if (JSON.parse(err.error).statusCode !== undefined && JSON.parse(err.error).statusCode === 500) {
                            errorMessage = 'Internal server error';
                        }
                        else {
                            if (err.error.length > 60) {
                                errorMessage = JSON.parse(err.error).error;
                            }
                            else {
                                errorMessage = err.error;
                            }
                        }
                    }
                    else {
                        errorMessage = err.error;
                    }
                }
                else {
                    errorMessage = JSON.parse(err.error).error;
                }
            }
            else if (err.status === 500) {
                errorMessage = 'Internal server error';
            }
            else if (err.error.messsage === undefined) {
                if (typeof err.error === 'object') {
                    errorMessage = JSON.parse(JSON.stringify(err.error)).error;
                }
                else {
                    if (typeof err.error === 'string' && err.error !== undefined) {
                        if (err.error.length > 60) {
                            if (JSON.parse(err.error).statusCode !== undefined && JSON.parse(err.error).statusCode === 500) {
                                errorMessage = 'Internal server error';
                            }
                            else {
                                if (err.error.length > 60) {
                                    errorMessage = JSON.parse(err.error).error;
                                }
                                else {
                                    errorMessage = err.error;
                                }
                            }
                        }
                        else {
                            errorMessage = err.error;
                        }
                    }
                    else {
                        errorMessage = JSON.parse(err.error).error;
                    }
                }
            }
            else {
                if (err.error.message !== undefined) {
                    errorMessage = `${err.error.message}`;
                }
                else {
                    errorMessage = `${err.error}`;
                }
            }
        }
        return throwError(errorMessage);
    }
    getServerErrorMessage(isErrorExist, isDataNotExist = false, error = '') {
        const bodyContent = isDataNotExist ? error : 'Try again later';
        return {
            title: "There is a problem with the service",
            body: bodyContent,
            showError: isErrorExist
        };
    }
    static ɵfac = function ErrorHandlerService_Factory(t) { return new (t || ErrorHandlerService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ErrorHandlerService, factory: ErrorHandlerService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorHandlerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9zZXJ2aWNlcy9zaGFyZWQvZXJyb3ItaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFPOUMsTUFBTSxPQUFPLG1CQUFtQjtJQUU5QixnQkFBZ0IsQ0FBQztJQUdqQixXQUFXLENBQUMsR0FBc0I7UUFDaEMsSUFBSSxZQUFvQixDQUFDO1FBQ3pCLElBQUksR0FBRyxDQUFDLEtBQUssWUFBWSxLQUFLLEVBQUU7WUFDOUIsMkNBQTJDO1lBQzNDLFlBQVksR0FBRyxzQkFBc0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxRDthQUFNO1lBQ0wsc0RBQXNEO1lBQ3RELElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBRXRCLElBQUksT0FBTyxHQUFHLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtvQkFFNUQsSUFBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUU7d0JBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUM5Rjs0QkFDRSxZQUFZLEdBQUcsdUJBQXVCLENBQUM7eUJBQ3hDOzZCQUFNOzRCQUNMLElBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFO2dDQUN4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ZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuXG5leHBvcnQgY2xhc3MgRXJyb3JIYW5kbGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuXG4gIGhhbmRsZUVycm9yKGVycjogSHR0cEVycm9yUmVzcG9uc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgICBpZiAoZXJyLmVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIEEgY2xpZW50LXNpZGUgb3IgbmV0d29yayBlcnJvciBvY2N1cnJlZC5cbiAgICAgIGVycm9yTWVzc2FnZSA9IGBBbiBlcnJvciBvY2N1cnJlZDogJHtlcnIuZXJyb3IubWVzc2FnZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgYmFja2VuZCByZXR1cm5lZCBhbiB1bnN1Y2Nlc3NmdWwgcmVzcG9uc2UgY29kZS5cbiAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDQpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGVyci5lcnJvciA9PT0gJ3N0cmluZycgJiYgZXJyLmVycm9yICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgIGlmKGVyci5lcnJvci5sZW5ndGggPiA2MCkge1xuICAgICAgICAgICAgaWYgKEpTT04ucGFyc2UoZXJyLmVycm9yKS5zdGF0dXNDb2RlICE9PSB1bmRlZmluZWQgJiYgSlNPTi5wYXJzZShlcnIuZXJyb3IpLnN0YXR1c0NvZGUgPT09IDUwMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gJ0ludGVybmFsIHNlcnZlciBlcnJvcic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZihlcnIuZXJyb3IubGVuZ3RoID4gNjApIHtcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAgSlNPTi5wYXJzZShlcnIuZXJyb3IpLmVycm9yO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9ICBlcnIuZXJyb3I7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAgZXJyLmVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAgSlNPTi5wYXJzZShlcnIuZXJyb3IpLmVycm9yO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGVyci5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSAnSW50ZXJuYWwgc2VydmVyIGVycm9yJztcbiAgICAgIH0gZWxzZSBpZiAoZXJyLmVycm9yLm1lc3NzYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYoIHR5cGVvZiBlcnIuZXJyb3IgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlID0gIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZXJyLmVycm9yKSkuZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBlcnIuZXJyb3IgPT09ICdzdHJpbmcnICYmIGVyci5lcnJvciAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGlmKGVyci5lcnJvci5sZW5ndGggPiA2MCkge1xuICAgICAgICAgICAgICBpZiAoSlNPTi5wYXJzZShlcnIuZXJyb3IpLnN0YXR1c0NvZGUgIT09IHVuZGVmaW5lZCAmJiBKU09OLnBhcnNlKGVyci5lcnJvcikuc3RhdHVzQ29kZSA9PT0gNTAwKVxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gJ0ludGVybmFsIHNlcnZlciBlcnJvcic7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoZXJyLmVycm9yLmxlbmd0aCA+IDYwKSB7XG4gICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAgSlNPTi5wYXJzZShlcnIuZXJyb3IpLmVycm9yO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAgZXJyLmVycm9yO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAgZXJyLmVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAgSlNPTi5wYXJzZShlcnIuZXJyb3IpLmVycm9yO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlcnIuZXJyb3IubWVzc2FnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlID0gYCR7ZXJyLmVycm9yLm1lc3NhZ2V9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBgJHtlcnIuZXJyb3J9YDtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yTWVzc2FnZSk7XG4gIH1cblxuXG4gIGdldFNlcnZlckVycm9yTWVzc2FnZShpc0Vycm9yRXhpc3QsIGlzRGF0YU5vdEV4aXN0ID0gZmFsc2UsIGVycm9yPScnKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBpc0RhdGFOb3RFeGlzdCA/IGVycm9yIDogJ1RyeSBhZ2FpbiBsYXRlcic7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiBcIlRoZXJlIGlzIGEgcHJvYmxlbSB3aXRoIHRoZSBzZXJ2aWNlXCIsXG4gICAgICBib2R5OiBib2R5Q29udGVudCxcbiAgICAgIHNob3dFcnJvcjogaXNFcnJvckV4aXN0XG4gICAgfTtcbiAgfVxufVxuIl19