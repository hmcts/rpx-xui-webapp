import { NextFunction, Response } from 'express';
import { handleGet, handlePost } from '../common/mockService';
import { StaffDataUser } from './models/staff-data-user.model';
import { StaffFilterOption } from './models/staff-filter-option.model';
import * as mock from './staff-ref-data.mock';

mock.init();

export async function getFilteredUsers(req, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `/refdata/case-worker/profile`;

  try {
    const {status, data}: { status: number, data: StaffDataUser[] } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export async function getUserTypes(req, res: Response, next: NextFunction) {
  const markupPath: string = `/refdata/case-worker/user-type`;

  try {
    const {status, data}: { status: number, data: StaffFilterOption[] } = await handleGet(markupPath, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export async function getJobTitles(req, res: Response, next: NextFunction) {
  const markupPath: string = `/refdata/case-worker/job-title`;

  try {
    const {status, data}: { status: number, data: StaffFilterOption[] } = await handleGet(markupPath, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export async function getSkills(req, res: Response, next: NextFunction) {
  const markupPath: string = `/refdata/case-worker/skill`;

  try {
    const {status, data}: { status: number, data: StaffFilterOption[] } = await handleGet(markupPath, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
