import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';
import { RoleCategory } from './models/allocate-role.enum';

export async function getPossibleRoles(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  const personRoles = [
    {roleId: 'lead-judge', roleName: 'Lead judge', roleCategory: RoleCategory.JUDICIAL},
    {roleId: 'hearing-judge', roleName: 'Hearing judge', roleCategory: RoleCategory.JUDICIAL},
    {roleId: 'case-manager', roleName: 'Case manager', roleCategory: RoleCategory.LEGAL_OPERATIONS}];
  return res.send(personRoles).status(200);
}
