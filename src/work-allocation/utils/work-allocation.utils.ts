import { NavigationExtras } from '@angular/router';

interface Navigator {
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean>;
}

export const handleFatalErrors = (status: number, router: Navigator): number => {
  switch (status) {
    case 401:
    case 403:
      router.navigate(['/not-authorised']);
      return 0; // 0 indicates it has been handled.
    case 500:
    case 503:
      router.navigate(['/service-down']);
      return 0; // 0 indicates it has been handled.
    default:
      // If it's anything other than a 401, 403, or 500, we should not
      // send the User to an error page. This should be handled within
      // the component so just return the status.
      return status;
  }
};
