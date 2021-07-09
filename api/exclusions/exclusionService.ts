import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';

export async function getAllExclusions(req: EnhancedRequest, res: Response, next: NextFunction) {
    const exclusions = [
        {
            added: Date.UTC(2021, 7, 1),
            name: 'Judge Birch',
            notes: 'this case been remitted from Upper Tribunal and required different judge',
            type: 'Other',
            userType: 'Judicial',
        },
    ];
    return res.send(exclusions).status(200);
}
