import { NextFunction, Response } from 'express';
// import { MockStaffRefDataAPI } from './mock-staff-ref-data-api';
import { RealStaffRefDataAPI } from './real-staff-ref-data-api';
/* tslint:disable */
const StaffRefDataService = require('./staff-ref-data.service');

// Use below line to mock staff ref API
// const staffRefDataService = new StaffRefDataService(new MockStaffRefDataAPI());
// Use below line to use real staff ref API
const staffRefDataService = new StaffRefDataService(new RealStaffRefDataAPI());

export async function getFilteredUsers(req: any, res: Response, next: NextFunction) {
  staffRefDataService.getFilteredUsers(req, res, next);
}

export async function getUserTypes(req: any, res: Response, next: NextFunction) {
  staffRefDataService.getUserTypes(req, res, next);
}

export async function getJobTitles(req: any, res: Response, next: NextFunction) {
  staffRefDataService.getJobTitles(req, res, next);
}

export async function getServices(req: any, res: Response, next: NextFunction) {
  staffRefDataService.getServices(req, res, next);
}

export async function getSkills(req: any, res: Response, next: NextFunction) {
  staffRefDataService.getSkills(req, res, next);
}

export async function getUsersByPartialName(req: any, res: Response, next: NextFunction) {
  staffRefDataService.getUsersByPartialName(req, res, next);
}

export async function addNewUser(req: any, res: Response, next: NextFunction) {
  staffRefDataService.addNewUser(req, res, next);
}

export async function fetchSingleUserById(req: any, res: Response, next: NextFunction) {
  staffRefDataService.fetchSingleUserById(req, res, next);
}

export async function fetchUsersById(req: any, res: Response, next: NextFunction) {
  staffRefDataService.fetchUsersById(req, res, next);
}

export async function updateUser(req: any, res: Response, next: NextFunction) {
  staffRefDataService.updateUser(req, res, next);
}
