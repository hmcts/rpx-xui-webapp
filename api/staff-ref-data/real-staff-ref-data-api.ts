import { NextFunction, Response } from 'express';
import * as querystring from 'querystring';
import { sendGet, sendPost, sendPut } from '../common/crudService';
import { getConfigValue } from '../configuration';
import { SERVICES_CASE_CASEWORKER_REF_PATH, SERVICE_REF_DATA_MAPPING } from '../configuration/references';
import { StaffUser } from './models/staff-data-user.model';
import { GroupOption, Service, StaffFilterOption } from './models/staff-filter-option.model';
import { StaffRefDataAPI } from './models/staff-ref-data.model';

export class RealStaffRefDataAPI implements StaffRefDataAPI {
  public baseCaseWorkerRefUrl = getConfigValue(SERVICES_CASE_CASEWORKER_REF_PATH);

  async getFilteredUsers(req: any, res: Response, next: NextFunction) {
    const queryStrings = querystring.stringify(req.query);
    const pageSize = req.headers['page-size'] || 20;
    const pageNumber = req.headers['page-number'] || 1;

    const apiPath = `${this.baseCaseWorkerRefUrl}/refdata/case-worker/profile/search?${queryStrings}`;

    try {
      const { status, data, headers }: { status: number, data: StaffUser[], headers: any }
        = await sendGet(apiPath, req, {
          'page-number': pageNumber,
          'page-size': pageSize
        });

      res.status(status).send({
        items: data,
        pageSize: parseInt(pageSize, 10),
        pageNumber: parseInt(pageNumber, 10),
        totalItems: parseInt(headers['total-records'], 10)
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserTypes(req, res: Response, next: NextFunction) {
    const apiPath: string = `${this.baseCaseWorkerRefUrl}/refdata/case-worker/user-type`;

    try {
      const { status, data }: { status: number, data } = await sendGet(apiPath, req);

      const options: StaffFilterOption[] = [];
      data.user_type.forEach((element) => {
        options.push({ key: element.id, label: element.code });
      });

      res.status(status).send(this.sortArray(options));
    } catch (error) {
      next(error);
    }
  }

  async getJobTitles(req, res: Response, next: NextFunction) {
    const apiPath: string = `${this.baseCaseWorkerRefUrl}/refdata/case-worker/job-title`;

    try {
      const { status, data }: { status: number, data } = await sendGet(apiPath, req);

      const options: StaffFilterOption[] = [];
      data.job_title.forEach((element) => {
        options.push({ key: String(element.role_id), label: element.role_description });
      });

      res.status(status).send(this.sortArray(options));
    } catch (error) {
      next(error);
    }
  }

  async getServices(req, res: Response, next: NextFunction) {
    const apiPath: string = `${this.baseCaseWorkerRefUrl}/refdata/case-worker/skill`;

    try {
      const { status, data }: { status: number, data } = await sendGet(apiPath, req);

      const options: StaffFilterOption[] = [];
      const serviceRefData = getConfigValue(SERVICE_REF_DATA_MAPPING) as Service[];
      data.service_skill.forEach((element) => {
        serviceRefData.forEach((service) => {
          const selectedServiceCodes = service.serviceCodes.filter((s) => s === element.id);
          if (selectedServiceCodes.length > 0) {
            options.push({ key: element.id, label: service.service });
          }
        });
      });

      res.status(status).send(options);
    } catch (error) {
      next(error);
    }
  }

  async getSkills(req, res: Response, next: NextFunction) {
    const apiPath: string = `${this.baseCaseWorkerRefUrl}/refdata/case-worker/skill`;

    try {
      const { status, data }: { status: number, data } = await sendGet(apiPath, req);
      const groupOptions: GroupOption[] = [];
      data.service_skill.forEach((services) => {
        const options: StaffFilterOption[] = [];
        services.skills.forEach((skill) => {
          options.push({ key: skill.id, label: skill.description });
        });
        groupOptions.push({ group: services.id, options });
      });

      res.status(status).send(groupOptions);
    } catch (error) {
      next(error);
    }
  }

  async getUsersByPartialName(req, res: Response, next: NextFunction) {
    const searchParam = req.query.search ? req.query.search : '';
    const pageSize = req.headers['page-size'] || 20;
    const pageNumber = req.headers['page-number'] || 1;

    const apiPath = `${this.baseCaseWorkerRefUrl}/refdata/case-worker/profile/search-by-name?search=${searchParam}`;

    try {
      const { status, data, headers }: { status: number, data: StaffUser[], headers: any } =
        await sendGet(apiPath, req, {
          'page-number': pageNumber,
          'page-size': pageSize
        });

      res.status(status).send({
        items: data,
        pageSize: parseInt(pageSize, 10),
        pageNumber: parseInt(pageNumber, 10),
        totalItems: parseInt(headers['total-records'], 10)
      });
    } catch (error) {
      next(error);
    }
  }

  sortArray(array: StaffFilterOption[]) {
    return array.sort((a, b) => a.label.localeCompare(b.label));
  }

  async addNewUser(req, res: Response, next: NextFunction) {
    const reqBody = req.body;
    const apiPath: string = '/refdata/case-worker/profile';

    try {
      const { status, data }: { status: number, data: StaffUser }
        = await sendPost(`${this.baseCaseWorkerRefUrl}${apiPath}`, reqBody, req);
      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  }

  async fetchUsersById(req, res, next: NextFunction) {
    const reqBody = req.body;
    const apiPath = `${this.baseCaseWorkerRefUrl}/refdata/case-worker/users/fetchUsersById`;

    try {
      const { status, data }: { status: number; data: StaffUser } = await sendPost(apiPath, reqBody, req);
      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  }

  async fetchSingleUserById(req, res, next: NextFunction) {
    const userId = req.query.id;
    const apiPath = `${this.baseCaseWorkerRefUrl}/refdata/case-worker/profile/search-by-id?id=${userId}`;

    try {
      const { status, data }: { status: number; data: StaffUser } = await sendGet(apiPath, req);
      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res: Response, next: NextFunction) {
    const reqBody = req.body;
    const apiPath: string = `${this.baseCaseWorkerRefUrl}/refdata/case-worker/profile`;

    try {
      const { status, data }: { status: number, data: StaffUser } = await sendPut(apiPath, reqBody, req);
      res.status(status).send(data);
    } catch (error) {
      next(error);
    }
  }
}
