import * as i0 from "@angular/core";
export declare abstract class Logger {
    info: any;
    warn: any;
    error: any;
}
export declare class LoggerService implements Logger {
    info: any;
    warn: any;
    error: any;
    invokeConsoleMethod(type: string, args?: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoggerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LoggerService>;
}
//# sourceMappingURL=logger.service.d.ts.map