import { Page } from "@playwright/test";
import config, { UserRole } from "../../../config.ts";
import idamLoginHelper from "../../../helpers/idamLoginHelper.ts";

type CaseAPILoginPage = {
  SignInUser(page: Page, user: UserRole): Promise<void>;
};

const caseAPILoginPage: CaseAPILoginPage = {
  async SignInUser(page: Page, user: UserRole): Promise<void> {
    await idamLoginHelper.signInUser(page, user, config.CaseAPIBaseURL);
  },
};

export default caseAPILoginPage;
