import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  /**
   * Get an item from the session storage.
   * If remove is true, the item will be removed once read
   * @param removeAfterRead removed the key once it has been read
   */
  public getItem(key: string, removeAfterRead: boolean = false): string {
    const item = sessionStorage.getItem(key);

    if (removeAfterRead) this.removeItem(key);

    return item;
  }

  /**
   * Set an item in the session storage.
   */
  public setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  /**
   * Remove an item in the session storage.
   */
  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * Clear all the items held in session storage.
   */
  public clear(): void {
    sessionStorage.clear();
  }
}
