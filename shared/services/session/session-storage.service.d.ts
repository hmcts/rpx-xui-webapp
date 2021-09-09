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
     * Clear all the items held in session storage.
     */
    clear(): void;
}
