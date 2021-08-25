import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';

export async function getPossibleRoles(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  const personRoles = [
    {roleId: 'lead', roleName: 'Lead judge', roleType: 'judicial'},
    {roleId: 'hearing', roleName: 'Hearing judge', roleType: 'judicial'},
    {roleId: 'manager', roleName: 'Case manager', roleType: 'legalops'}];
  return res.send(personRoles).status(200);
}
