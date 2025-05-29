import { PersonRole } from '@hmcts/rpx-xui-common-lib';

export interface Person {
  id: string;
  name: string;
  email: string;
  domain: PersonRole;
  knownAs?: string;
  personalCode?: string;
}

export interface SearchOptions {
  searchTerm: string;
  jurisdiction: string;
}
