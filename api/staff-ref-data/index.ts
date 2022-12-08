import { NextFunction, Response } from 'express';
import { handleGet, handlePost } from '../common/mockService';
import { StaffDataUser } from './models/staff-data-user.model';
import * as mock from './staff-ref-data.mock';

mock.init();

export async function getStaffRefUserDetails(req, res: Response, next: NextFunction) {
  const id = req.params.id;
  const apiPath: string = `/refdata/case-worker/user-details/${id}`;

  try {
    const {status, data}: { status: number, data: StaffDataUser } = await handleGet(apiPath, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export async function addNewUser(req, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const apiPath: string = `/refdata/case-worker/profile`;

  try {
    const {status, data}: { status: number, data: StaffDataUser } = await handlePost(apiPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
