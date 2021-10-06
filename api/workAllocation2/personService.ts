import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';
import { PERSON } from './constants/mock.data';
import { PersonRole } from './interfaces/person';
import { applySearchFilter } from './util';

// judicial person search
export async function postFindPersonSearch(req: EnhancedRequest, res: Response, next: NextFunction) {
    if (!req.body || !req.body.searchOptions || !req.body.searchOptions.searchTerm) {
        res.status(400);
        res.send('searchOptions body missing. searchTerm is missing');
        return;
    }
    const searchTerm = req.body.searchOptions.searchTerm;
    const domain = req.body.searchOptions.jurisdiction as PersonRole;
    let searchResult = PERSON.filter(person => applySearchFilter(person, domain, searchTerm));
    if (searchResult && searchResult.length === 0) {
        searchResult = [];
    }
    res.status(200);
    res.send(searchResult);
}
