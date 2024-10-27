import { test as base } from '@playwright/test';
import { ManageDocuments } from '../../E2E/pages/manage-documents';
import { RaiseQuery } from '../../E2E/pages/raise-query';
import { RespondToQuery} from "../pages/respond-to-query";

import {SignIn} from "../pages/sign-in";

type CreateFixture = {
  signIn : SignIn,
  raiseAQuery : RaiseQuery,
  respondToQuery: RespondToQuery,
  manageDocuments: ManageDocuments,
}
export const test = base.extend<CreateFixture>({

  signIn: async ({ page }, use) => {
    await use(new SignIn(page));
  },
  raiseAQuery: async ({ page }, use) => {
     await use(new RaiseQuery(page));
   },
  manageDocuments: async ({ page }, use) => {
    await use(new ManageDocuments(page));
  },
  respondToQuery: async ({ page }, use) => {
    await use(new RespondToQuery(page));
  }
});
