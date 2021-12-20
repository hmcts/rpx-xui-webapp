import { NextFunction, Response } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICES_CASE_JUDICIAL_REF_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { PERSON } from './constants/mock.data';
import { PersonRole } from './interfaces/person';
import { applySearchFilter } from './util';

const JUDICIAL_REF_URL = getConfigValue(SERVICES_CASE_JUDICIAL_REF_PATH);

// judicial person search
export async function postFindPersonSearch(req: EnhancedRequest, res: Response, next: NextFunction) {
  if (!req.body || !req.body.searchOptions || !req.body.searchOptions.searchTerm) {
    res.status(400);
    res.send('searchOptions body missing. searchTerm is missing');
    return;
  }
  const searchString = req.body.searchOptions.searchTerm;
  const domain = req.body.searchOptions.jurisdiction as PersonRole;
  let searchResult: any = [];
  if (domain === PersonRole.JUDICIAL) {
    try {
      const headers = setHeaders(req);
      const response = await http.post(`${JUDICIAL_REF_URL}/refdata/judicial/users/search`, { searchString }, { headers });
      searchResult = response.data ? response.data : [];
      if (req.body.userId) {
        const userId = req.body.userId;
        searchResult = searchResult.filter(person => person.idamId !== userId);
      }
      searchResult = searchResult.map((s: any) => ({ ...searchResult, name: s.fullName, email: s.emailId, id: s.idamId }));
    } catch (e) {
      if (e.status === 404) {
        res.status(200);
        res.send([]);
        return;
      }
      res.status(e.status);
      res.send(e.data.errorMessage);
      return;
    }
  } else {
    searchResult = PERSON.filter(person => applySearchFilter(person, domain, searchString));
  }

  res.status(200);
  res.send(searchResult);
}
