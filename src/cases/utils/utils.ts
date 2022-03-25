import {UserDetails} from '../../app/models';
import {CaseRole, RoleCategory, RoleExclusion} from '../../role-access/models';
import {CaseRoleDetails} from '../../role-access/models/case-role-details.interface';
import {FeatureVariation} from '../models/feature-variation.model';

export function isStringOrNumber(value: any): boolean {
  return (typeof value === 'string' && value.length !== 0) || (typeof value === 'number');
}

export function getFilterType(fieldName: string, metadataFields): string {
  return (metadataFields && (metadataFields.indexOf(fieldName) > -1)) ?
    'metadataFilter' : 'caseFilter';
}

export function sanitiseMetadataFieldName(filterType: string, fieldName: string): string {
  if (filterType === 'metadataFilter') {
    fieldName = fieldName.replace(/\[(.*?)]/g, '$1').toLocaleLowerCase();
  }
  return fieldName;
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


export function replaceAll(str: string, find: string, replace: string): string {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

export function getJudicialUserIds(caseRoles: CaseRole[]): string[] {
  const userIds = caseRoles.filter(role => role.roleCategory === RoleCategory.JUDICIAL).map(caseRole => caseRole.actorId);
  return userIds;
}

export function getJudicialUserIdsFromExclusions(exclusions: RoleExclusion[]): string[] {
  const userIds = exclusions.filter(role => role.userType.toUpperCase() === RoleCategory.JUDICIAL).map(exclusionRole => exclusionRole.actorId);
  return userIds;
}

export function mapCaseRolesForExclusions(exclusions: RoleExclusion[], caseRolesWithUserDetails: CaseRoleDetails[]): RoleExclusion[] {
  exclusions.forEach(exclusion => {
    if (caseRolesWithUserDetails.find(detail => detail.sidam_id === exclusion.actorId)) {
      exclusion.name = caseRolesWithUserDetails.find(detail => detail.sidam_id === exclusion.actorId).known_as;
    }
  });
  return exclusions;
}

export function mapCaseRoles(caseRoles: CaseRole[], caseRolesWithUserDetails: CaseRoleDetails[]): CaseRole[] {
  return caseRoles.map(role => {
    const userDetails = caseRolesWithUserDetails.find(detail => detail.sidam_id === role.actorId);
    if (!userDetails) {
      return role;
    }
    return {
      ...role,
      name: userDetails.full_name,
      email: userDetails.email_id,
    };
  });
}

export function hasMatchedJurisdictionAndRole(featureVariation: FeatureVariation, jurisdictionID: string, userDetails: UserDetails): boolean {
  if (featureVariation.jurisdiction === jurisdictionID) {
    if (userDetails && userDetails.userInfo) {
      return userDetails.userInfo.roles && featureVariation.roles ? userDetails.userInfo.roles.some(userRole =>
        featureVariation.roles.some(role => role === userRole)) : false;
    }
  } else {
    return false;
  }
}
