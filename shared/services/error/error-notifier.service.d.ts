import { Subject } from 'rxjs';
export declare class ErrorNotifierService {
    errorSource: Subject<any>;
    error: import("rxjs/internal/Observable").Observable<any>;
    announceError(error: any): void;
}
