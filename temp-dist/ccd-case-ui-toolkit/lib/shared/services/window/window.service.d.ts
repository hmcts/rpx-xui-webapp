import * as i0 from "@angular/core";
export declare class WindowService {
    locationAssign(url: string): void;
    setLocalStorage(key: string, value: string): void;
    getLocalStorage(key: string): string;
    clearLocalStorage(): void;
    removeLocalStorage(key: string): void;
    setSessionStorage(key: string, value: string): void;
    getSessionStorage(key: string): string;
    openOnNewTab(url: string): void;
    confirm(message: string): boolean;
    alert(message: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WindowService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WindowService>;
}
//# sourceMappingURL=window.service.d.ts.map