import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';

export async function getPossibleRoles(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  const personRoles = [
    {roleId: 'lead-judge', roleName: 'Lead judge', roleType: 'judicial'},
    {roleId: 'hearing-judge', roleName: 'Hearing judge', roleType: 'judicial'},
    {roleId: 'case-manager', roleName: 'Case manager', roleType: 'legalOps'}];
  return res.send(personRoles).status(200);
}
