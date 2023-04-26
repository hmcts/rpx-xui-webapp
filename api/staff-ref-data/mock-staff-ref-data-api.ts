import { NextFunction, Response } from 'express';
import { handleGet, handlePost } from '../common/mockService';
import { StaffUser } from './models/staff-data-user.model';
import { StaffFilterOption } from './models/staff-filter-option.model';
import { StaffRefDataAPI } from './models/staff-ref-data.model';
import * as mock from './staff-ref-data.mock';

export class MockStaffRefDataAPI implements StaffRefDataAPI {
  public constructor() {
    mock.init();
  }

  async getFilteredUsers(req, res: Response, next: NextFunction) {
    const reqBody = req.body;
    const apiPath: string = '/refdata/case-worker/profile';

    try {
      const { status, data }: { status: number, data: StaffUser[] } = await handlePost(apiPath, reqBody, req);
      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  }

  async getUserTypes(req, res: Response, next: NextFunction) {
    const apiPath: string = '/refdata/case-worker/user-type';

    try {
      const { status, data }: { status: number, data: StaffFilterOption[] } = await handleGet(apiPath, req);
      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  }

  async getJobTitles(req, res: Response, next: NextFunction) {
    const apiPath: string = '/refdata/case-worker/job-title';

    try {
      const { status, data }: { status: number, data: StaffFilterOption[] } = await handleGet(apiPath, req);
      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  }

  async getSkills(req, res: Response, next: NextFunction) {
    const apiPath: string = '/refdata/case-worker/skill';

    try {
      const { status, data }: { status: number, data } = await handleGet(apiPath, req);
      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  }

  async getUsersByPartialName(req, res: Response, next: NextFunction) {
    const searchParam = req.query.search ? req.query.search : '';
    const apiPath: string = `/refdata/case-worker/profile/search?search=${searchParam}`;

    try {
      const { status, data }: { status: number, data: StaffUser[] } = await handleGet(apiPath, req);
      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  }

  async addNewUser(req, res: Response, next: NextFunction) {
    const reqBody = req.body;
    const apiPath: string = '/refdata/case-worker/profile';

    try {
      const { status, data }: { status: number, data: StaffUser } = await handlePost(apiPath, reqBody, req);
      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  }

  async fetchUsersById(req, res: Response, next: NextFunction) {
    const apiPath: string = '/refdata/case-worker/users/fetchUsersById';

    try {
      const { status, data }: { status: number, data: StaffUser } = await handleGet(apiPath, req);
      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  }
}
