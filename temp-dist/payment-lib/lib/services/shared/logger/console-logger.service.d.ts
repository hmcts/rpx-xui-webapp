import { Logger } from './logger.service';
import * as i0 from "@angular/core";
export declare let isDebugMode: boolean;
export declare class ConsoleLoggerService implements Logger {
    get info(): any;
    get warn(): any;
    get error(): any;
    invokeConsoleMethod(type: string, args?: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsoleLoggerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConsoleLoggerService>;
}
//# sourceMappingURL=console-logger.service.d.ts.map