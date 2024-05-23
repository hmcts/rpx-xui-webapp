import config, { UserCredentials } from "../config.ts";
import { Page } from "@playwright/test";

interface UserLoginInfo {
  username: string;
  password: string;
}

type IdamLoginHelper = {
  fields: UserLoginInfo;
  submitButton: string;
  signInUser(
    page: Page,
    user: keyof typeof config,
    application: string,
  ): Promise<void>;
};

const idamLoginHelper: IdamLoginHelper = {
  fields: {
    username: "#username",
    password: "#password",
  },
  submitButton: 'input[value="Sign in"]',

  async signInUser(
    page: Page,
    user: keyof typeof config,
    application: string,
  ): Promise<void> {
    if (!page.url().includes("idam-web-public.")) {
      await page.goto(application);
    }
    await page.waitForSelector(
      `#skiplinktarget:text("Sign in or create an account")`,
    );

    const isUserCredentials = (
      value: UserCredentials | string,
    ): value is UserCredentials => {
      return typeof value !== "string";
    };

    const userCredentials: UserCredentials | string = config[user];
    if (isUserCredentials(userCredentials)) {
      await page.fill(this.fields.username, userCredentials.email);
      await page.fill(this.fields.password, userCredentials.password);
      await page.click(this.submitButton);
    } else {
      console.error("Invalid credential type");
    }
  },
};

export default idamLoginHelper;
