import { CachedCaseworker } from './interfaces/common';

export class FullUserDetailCache {
  // singleton class to keep single instance of role assignment query
  private static instance: FullUserDetailCache;
  private userDetails: CachedCaseworker[];

  static getInstance(): FullUserDetailCache {
    this.instance = this.instance ? this.instance : new FullUserDetailCache();
    return this.instance;
  }

  setUserDetails(userDetails: CachedCaseworker[]): void {
    this.userDetails = userDetails;
  }

  getAllUserDetails(): CachedCaseworker[] {
    return this.userDetails;
  }
}
