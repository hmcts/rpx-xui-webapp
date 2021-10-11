import { NavigationExtras } from '@angular/router';

import { RoleAccessHttpError, SpecificRole, TypeOfRole } from '../models';
import { RoleCaptionText } from '../models/enums/allocation-text';
import { InfoMessageType } from '../models/enums/info-message-type';

interface Navigator {
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean>;
}

export enum REDIRECTS {
  NotAuthorised = '/not-authorised',
  ServiceDown = '/service-down'
}

export const getTitleText = (role: SpecificRole, action: string, roleCategory: string): string => {
  if (role && role.name) {
    return role.name === TypeOfRole.CaseManager ? `${action} ${RoleCaptionText.ALegalOpsCaseManager}` : `${action} a ${role.name.toLowerCase()}`;
  } else {
    return roleCategory  ? `${action} a ${roleCategory.replace('_', ' ').toLowerCase()} role` : `${action} a role`;
  }
};

export const handleError = (error: RoleAccessHttpError, navigator: Navigator, defaultUrl: string): void => {
  if (error && error.status) {
    switch (error.status) {
      case 401:
      case 403:
        {
          navigator.navigate([REDIRECTS.NotAuthorised]);
          return;
        }
      case 400:
      case 500:
      case 503:
        {
          navigator.navigate([REDIRECTS.ServiceDown]);
          return;
        }
      default:
        {
        navigator.navigate([defaultUrl], {
          state: {
            showMessage: true,
            // show message based on error
            message: { type: InfoMessageType.WARNING, message: error.message }}
          });
        }
    }
  }
};
