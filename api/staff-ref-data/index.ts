import { NextFunction, Response } from 'express';
import { handlePost } from '../common/mockService';
import { StaffRefDataUser } from './models/staff-ref-data-user.model';
import * as mock from './staff-ref-data.mock';

mock.init();

export async function getFilteredUsers(req, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `/refdata/case-worker/profile`;

  try {
    const {status, data}: { status: number, data: StaffRefDataUser[] } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
