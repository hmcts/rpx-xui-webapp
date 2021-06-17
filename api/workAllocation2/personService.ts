import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';
import { PERSON } from './constants/mock.data';

export async function postFindPersonSearch(req: EnhancedRequest, res: Response, next: NextFunction) {
    if (!req.body || !req.body.searchOptions || !req.body.searchOptions.searchTerm) {
        res.status(400);
        res.send('searchOptions body missing. searchTerm is missing');
        return
    }
    const searchTerm = req.body.searchOptions.searchTerm;
    let searchResult = PERSON.filter(person => person.name.includes(searchTerm));
    if (searchResult && searchResult.length === 0) {
        const noResultsPerson = {
            domain: '',
            email: '',
            id: '',
            name: 'No results found',
        };
        searchResult = [noResultsPerson];
    }
    res.status(200);
    res.send(searchResult);
}
