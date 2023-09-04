import * as i0 from "@angular/core";
export declare class SessionStorageService {
    /**
     * Get an item from the session storage.
     */
    getItem(key: string): string;
    /**
     * Set an item in the session storage.
     */
    setItem(key: string, value: string): void;
    /**
     * Remove an item from the session storage.
     */
    removeItem(key: string): void;
    /**
     * Clear all the items held in session storage.
     */
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SessionStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SessionStorageService>;
}
//# sourceMappingURL=session-storage.service.d.ts.map