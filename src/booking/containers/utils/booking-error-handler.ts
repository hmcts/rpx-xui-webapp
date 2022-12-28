import { NavigationExtras } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
interface Navigator {
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean>;
}

export enum REDIRECTS {
  NotAuthorised = '/not-authorised',
  ServiceDown = '/service-down',
  DefaulthBookingUrl = '/booking-service-down',
  DefaulthRefreshBookingUrl = '/refresh-booking-service-down',
}

export const CreateBookingHandleError = ( error: any, navigator: Navigator ): void => {
  if (error && error.status) {
    switch (error.status) {
      case 401:
      case 403: {
        navigator.navigate([REDIRECTS.NotAuthorised]);
        return;
      }
      case 500: {
        navigator.navigate([REDIRECTS.ServiceDown]);
        return;
      }
      default: {
        navigator.navigate([REDIRECTS.DefaulthBookingUrl]);
      }
    }
  }
};

export const RefreshBookingHandleError = ( error: any, navigator: Navigator ): void => {
  if (error && error.status) {
    navigator.navigate([REDIRECTS.DefaulthRefreshBookingUrl]);
  }
};


export declare class HttpError {
  private static readonly DEFAULT_ERROR;
  private static readonly DEFAULT_MESSAGE;
  private static readonly DEFAULT_STATUS;
  public status: number;
  public static from(response: HttpErrorResponse): HttpError;
}
