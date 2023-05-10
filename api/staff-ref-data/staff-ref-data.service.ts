import { NextFunction, Response } from 'express';
// import { MockStaffRefDataAPI } from './mock-staff-ref-data-api';
import { RealStaffRefDataAPI } from './real-staff-ref-data-api';

class StaffRefDataService {
  // Use below line to mock staff ref API
  // public constructor(private service: MockStaffRefDataAPI) {}
  // Use below line to use real staff ref API
  public constructor(private service: RealStaffRefDataAPI) {}

  async getFilteredUsers(req, res: Response, next: NextFunction) {
    return this.service.getFilteredUsers(req, res, next);
  }

  async getUserTypes(req, res: Response, next: NextFunction) {
    return this.service.getUserTypes(req, res, next);
  }

  async getJobTitles(req, res: Response, next: NextFunction) {
    return this.service.getJobTitles(req, res, next);
  }

  async getServices(req, res: Response, next: NextFunction) {
    return this.service.getServices(req, res, next);
  }

  async getSkills(req, res: Response, next: NextFunction) {
    return this.service.getSkills(req, res, next);
  }

  async getUsersByPartialName(req, res: Response, next: NextFunction) {
    return this.service.getUsersByPartialName(req, res, next);
  }

  async addNewUser(req, res: Response, next: NextFunction) {
    return this.service.addNewUser(req, res, next);
  }

  async fetchUsersById(req, res: Response, next: NextFunction) {
    return this.service.fetchUsersById(req, res, next);
  }

  async fetchSingleUserById(req, res: Response, next: NextFunction) {
    return this.service.fetchSingleUserById(req, res, next);
  }

  async updateUser(req, res: Response, next: NextFunction) {
    return this.service.updateUser(req, res, next);
  }
}

module.exports = StaffRefDataService;
