import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  /**
   * Get an item from the session storage.
   */
  public getItem(key: string): string {
    return sessionStorage.getItem(key);
  }

  /**
   * Set an item in the session storage.
   */
  public setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }
}
