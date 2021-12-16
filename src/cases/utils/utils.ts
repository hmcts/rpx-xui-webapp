import { CaseRole, RoleCategory, RoleExclusion } from '../../role-access/models';

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
