import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RetryUtil {
    pipeTimeoutMechanismOn<T>(in$: Observable<T>, preferredArtificialDelay: number, timeoutPeriods: number[]): Observable<T>;
    private pipeTimeOutControlOn;
    private pipeRetryMechanismOn;
    private pipeArtificialDelayOn;
    static ɵfac: i0.ɵɵFactoryDeclaration<RetryUtil, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RetryUtil>;
}
//# sourceMappingURL=retry.service.d.ts.map