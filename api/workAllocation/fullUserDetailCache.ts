import { CachedCaseworker } from './interfaces/common';

export class FullUserDetailCache {
  // singleton class to keep single instance of role assignment query
  private static instance: FullUserDetailCache;
  private userDetails: CachedCaseworker[];
  private userDetailsByIdamId: Map<string, CachedCaseworker> = new Map();

  private static getInstance(): FullUserDetailCache {
    this.instance = this.instance ? this.instance : new FullUserDetailCache();
    return this.instance;
  }

  static setUserDetails(userDetails: CachedCaseworker[]): void {
    const instance = this.getInstance();
    instance.userDetails = userDetails;
    instance.userDetailsByIdamId = new Map(
      instance.userDetails
        .filter((user) => !!user.idamId)
        .map((user) => [user.idamId, user] as [string, CachedCaseworker])
    );
  }

  static getAllUserDetails(): CachedCaseworker[] {
    const instance = this.getInstance();
    return instance.userDetails;
  }

  static getUserByIdamId(idamId: string): CachedCaseworker {
    if (!idamId) {
      return null;
    }
    return this.getInstance().userDetailsByIdamId.get(idamId);
  }

  static getUsersByIdamIds(idamIds: string[]): CachedCaseworker[] {
    if (!idamIds?.length) {
      return [];
    }
    const instance = this.getInstance();
    const idamIdSet = new Set(idamIds);
    return [...idamIdSet]
      .map((idamId) => instance.userDetailsByIdamId.get(idamId))
      .filter((user) => !!user);
  }
}
