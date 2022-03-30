/* tslint:disable:max-line-length */
import MockAdapter from 'axios-mock-adapter';
import { HttpMockAdapter } from '../../common/httpMockAdapter';
import { ALL_JUDICIAL_USERS } from './data/judicial.mock.data';
import { JudicialUserModel } from "./models/judicialUser.model";

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();
  const searchJudicialUrl = /refdata\/judicial\/users/;
  const searchJudicialUser = /refdata\/judicial\/users\/search/;

  mock.onPost(searchJudicialUser).reply(config => {
    const data = JSON.parse(config.data);
    const searchedValue: string = data.searchString;
    const searchResult: JudicialUserModel[] = ALL_JUDICIAL_USERS.filter(user => user.full_name.toLowerCase().includes(searchedValue.toLowerCase()));
    return [
      200,
      searchResult,
    ];
  });

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
