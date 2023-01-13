import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { StaffDataUser } from './staff-data-user.model';

export interface StaffRefDataAPI {

  getFilteredUsers(req, res: Response, next: NextFunction)

}
