import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';

export async function getJudicialRoles(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  const personRoles = [
    {roleId: 'lead', roleName: 'Lead judge'},
    {roleId: 'hearing', roleName: 'Hearing judge'}];
  return res.send(personRoles).status(200);
}

export async function getLegalOpsRoles(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  const personRoles = [
    {roleId: 'manager', roleName: 'Case manager'}];
  return res.send(personRoles).status(200);
}
