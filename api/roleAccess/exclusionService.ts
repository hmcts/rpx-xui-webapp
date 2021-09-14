import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';

export async function getUserExclusions(req: EnhancedRequest, res: Response, next: NextFunction) {
  const isJudge = req.session.passport.user.userinfo.roles.includes('caseworker-ia-iacjudge');
  let exclusions;
  if (isJudge) {
    exclusions = [
      {
        added: Date.UTC(2021, 7, 1),
        name: 'Judge Birch',
        notes: 'this case been remitted from Upper Tribunal and required different judge',
        type: 'Other',
        userType: 'Judicial',
      },
      {
        added: Date.UTC(2021, 7, 10),
        name: 'Judge test',
        notes: 'this case been remitted from Upper Tribunal and required different judge',
        type: 'Other',
        userType: 'Judicial',
      },
    ];
  } else {
    exclusions = [];
  }

  return res.status(200).send(exclusions);
}

export async function confirmUserExclusion(req: EnhancedRequest, res: Response, next: NextFunction) {
  const exclusion = [
    {
      added: Date.UTC(2021, 7, 1),
      name: 'Judge ABCDE',
      notes: 'this case been remitted from Upper Tribunal and required different judge',
      type: 'Other',
      userType: 'Judicial',
    },
  ];
  const errorCodes: string[] = ['400', '401', '402', '403', '500', '503'];
  const value: string = req.body.exclusionDescription;
  if (errorCodes.indexOf(value) !== -1) {
    return res.status(parseInt(value, 10)).send(`{status: ${value}}`);
  }
  return res.status(200).send(exclusion);
}

export async function deleteUserExclusion(req: EnhancedRequest, res: Response, next: NextFunction) {
  return res.status(200).send(req.body.roleExclusion);
}
