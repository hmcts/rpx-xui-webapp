import { NavigationExtras } from '@angular/router';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';

import { ISessionStorageService } from '../../work-allocation/interfaces/common';
import { Role, RoleAccessHttpError, RolesByService, SpecificRole, TypeOfRole } from '../models';
import { InfoMessageType } from '../models/enums';
import { RoleCaptionText } from '../models/enums/allocation-text';

interface Navigator {
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean>;
}

export enum REDIRECTS {
  NotAuthorised = '/not-authorised',
  ServiceDown = '/service-down'
}

export const vowels = ['a', 'e', 'i', 'o', 'u'];

// gets the most detailed title possible based on data available
export const getTitleText = (role: SpecificRole, action: string, roleCategory: string): string => {
  if (role && role.name) {
    const aOrAn = vowels.includes(role.name.toLowerCase().charAt(0)) ? 'an' : 'a';
    return role.name === TypeOfRole.CaseManager ? `${action} ${RoleCaptionText.ALegalOpsCaseManager}` : `${action} ${aOrAn} ${role.name}`;
  }

  if (roleCategory === RoleCategory.ADMIN) {
    return `${action} an admin role`;
  } else if (roleCategory === RoleCategory.CTSC) {
    return `${action} a CTSC role`;
  }

  return roleCategory ? `${action} a ${roleCategory.replace('_', ' ')} role` : `${action} a role`;
};

// converts non-specific id to name when no known role connected
export const convertToName = (id: string): string => {
  if (id) {
    id = id.replace('-', ' ');
    return id.charAt(0).toUpperCase() + id.slice(1);
  }
  return '';
};

export const getAllRolesFromServices = (rolesByService: RolesByService[]): Role[] => {
  let allRoles: Role[] = [];
  rolesByService.forEach((roleListByService) => {
    allRoles = allRoles.concat(roleListByService.roles);
  });
  return allRoles;
};

export const getRoleSessionStorageKeyForServiceId = (serviceId: string): string => {
  return `${serviceId}-roles`;
};

export const getRoles = (serviceId: string, sessionStorageService: ISessionStorageService): Role[] => {
  const sessionKey = getRoleSessionStorageKeyForServiceId(serviceId);
  const value = sessionStorageService.getItem(sessionKey);
  if (value) {
    return JSON.parse(value) as Role[];
  }
};

export const setRoles = (serviceId: string, roles: Role[], sessionStorageService: ISessionStorageService): void => {
  const sessionKey = getRoleSessionStorageKeyForServiceId(serviceId);
  sessionStorageService.setItem(sessionKey, JSON.stringify(roles));
};

export const handleError = (error: RoleAccessHttpError, navigator: Navigator, defaultUrl: string): void => {
  if (error && error.status) {
    switch (error.status) {
      case 401:
      case 403: {
        navigator.navigate([REDIRECTS.NotAuthorised]);
        return;
      }
      case 400:
      case 500:
      case 503: {
        navigator.navigate([REDIRECTS.ServiceDown]);
        return;
      }
      default: {
        navigator.navigate([defaultUrl], {
          state: {
            showMessage: true,
            // show message based on error
            message: { type: InfoMessageType.WARNING, message: error.message }
          }
        });
      }
    }
  }
};
