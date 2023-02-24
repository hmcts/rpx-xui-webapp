import { NextFunction, Response } from 'express';

export interface StaffRefDataAPI {

  getFilteredUsers(req, res: Response, next: NextFunction);

}
