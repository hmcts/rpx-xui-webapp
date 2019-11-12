
import { AppConstants } from './app.constants';

export class AppUtils {
  static getEnvironment(url: string): string {
    const regex = 'pr-|localhost|aat|demo|ithc|perftest';
    const matched = url.match(regex);


    if (matched && matched[0]) {
      switch (matched[0]) {
        case AppConstants.ENVIRONMENT_NAMES.aat:
         case AppConstants.ENVIRONMENT_NAMES.localhost:
        case AppConstants.ENVIRONMENT_NAMES.pr:
          return AppConstants.ENVIRONMENT_NAMES.aat;
        case AppConstants.ENVIRONMENT_NAMES.demo:
          return AppConstants.ENVIRONMENT_NAMES.demo;
        case AppConstants.ENVIRONMENT_NAMES.ithc:
          return AppConstants.ENVIRONMENT_NAMES.ithc;
        case AppConstants.ENVIRONMENT_NAMES.perftest:
          return AppConstants.ENVIRONMENT_NAMES.perftest;
      }
    }
    return AppConstants.ENVIRONMENT_NAMES.prod;
  }

  static showNavItems(url: string): boolean {
    return url.indexOf('accept-terms-and-conditions') <= 0;
}
}
