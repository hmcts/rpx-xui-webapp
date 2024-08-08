import { Caseworker } from './interfaces/common';

export class FullUserDetailCache {
  // singleton class to keep single instance of role assignment query
  private static instance: FullUserDetailCache;
  private userDetails: Caseworker[];

  private static getInstance(): FullUserDetailCache {
    this.instance = this.instance ? this.instance : new FullUserDetailCache();
    return this.instance;
  }

  static setUserDetails(userDetails: Caseworker[]): void {
    const instance = this.getInstance();
    instance.userDetails = userDetails;
  }

  static getAllUserDetails(): Caseworker[] {
    const instance = this.getInstance();
    return instance.userDetails;
  }
}
