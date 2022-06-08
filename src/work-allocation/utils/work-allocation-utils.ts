import { NavigationExtras } from '@angular/router';

interface Navigator {
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean>;
}

export interface FatalRedirect {
  status: number;
  redirectTo: string;
}

export enum REDIRECTS {
  NotAuthorised = '/not-authorised',
  ServiceDown = '/service-down'
}

export const WILDCARD_SERVICE_DOWN: FatalRedirect[] = [
  { status: 0, redirectTo: REDIRECTS.ServiceDown }
];

export const treatAsFatal = (status: number, navigator: Navigator, fatals: FatalRedirect[]): number => {
  if (fatals && fatals.length > 0) {
    const fatal = fatals.find(f => f.status === status);
    if (fatal) {
      navigator.navigate([ fatal.redirectTo ]);
      return 0;
    } else {
      const wildcardFatal = fatals.find(f => f.status === 0);
      if (wildcardFatal) {
        navigator.navigate([ wildcardFatal.redirectTo ]);
        return 0;
      }
    }
  }
  return status;
};

export const handleFatalErrors = (status: number, navigator: Navigator, fatals?: FatalRedirect[]): number => {
  switch (status) {
    case 401:
    case 403:
      navigator.navigate([ REDIRECTS.NotAuthorised ]);
      return 0; // 0 indicates it has been handled.
    case 500:
    case 503:
      navigator.navigate([ REDIRECTS.ServiceDown ]);
      return 0; // 0 indicates it has been handled.
    case 400:
      navigator.navigate([ REDIRECTS.ServiceDown ]);
      return 400;
    default:
      // If it's anything other than a 400, 401, 403, 500, or 503, we should not
      // send the User to an error page. This should be handled within
      // the component so just return the status.

      // However, if they've specified that other errors should be treated
      // as fatal, we should handle that.
      return treatAsFatal(status, navigator, fatals);
  }
};

export const getAssigneeName = (caseworkers: any [], assignee: string): string => {
  if (assignee && caseworkers && caseworkers.some(cw => cw.idamId === assignee)) {
    const assignedCW = caseworkers.filter(cw => cw.idamId === assignee)[0];
    return `${assignedCW.firstName} ${assignedCW.lastName}`;
  }
  return null
};
