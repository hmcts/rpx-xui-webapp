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
    ];
  } else {
    exclusions = [];
  }

  return res.send(exclusions).status(200);
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
    if (['400, 401, 402, 403, 500, 503'].indexOf(req.body.exclusionDescription)) {
      return res.status(req.body.exclusionDescription).send('error: {status: req.body.exclusionDescription}"');
    }
  return res.send(exclusion).status(200);
}
