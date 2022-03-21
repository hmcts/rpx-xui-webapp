/* tslint:disable:max-line-length */
import MockAdapter from 'axios-mock-adapter';
import {HttpMockAdapter} from '../../common/httpMockAdapter';
import {ALL_JUDICIAL_USERS} from './data/judicial.mock.data';
import {JudicialUserModel} from "./models/judicialUser.model";

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();
  const searchJudicialUrl = /refdata\/judicial\/users/;

  mock.onPost(searchJudicialUrl).reply(config => {
    const data = JSON.parse(config.data);
    const personalCodes: string[] = data.personal_code;
    const searchResult: JudicialUserModel[] = ALL_JUDICIAL_USERS.filter(user => personalCodes.includes(user.personal_code));
    return [
      200,
      searchResult,
    ];
  });

};
