import fs from "fs";
import { Cookie } from "playwright-core";
import { config } from "./config.utils.js";

export class CookieUtils {
  // public async addAnalyticsCookie(user: UserCredentials): Promise<void> {
  //   /*
  //   note: cookie names and values can be different between services to check for your service you can accept the
  //   analytics cookies manually and then check the added cookie under Application -> Cookies in developer tools
  //    */
  //   if (user === config.users.citizen) {
  //     await this.addCitizenAnalyticsCookie(user.sessionFile);
  //   } else {
  //     await this.addManageCasesAnalyticsCookie(user.sessionFile);
  //   }
  // }

  public async addManageCasesAnalyticsCookie(
    sessionPath: string
  ): Promise<void> {
    try {
      const domain = (config.urls.exuiDefaultUrl as string).replace(
        "https://",
        ""
      );
      const state = JSON.parse(fs.readFileSync(sessionPath, "utf-8"));
      const userId = state.cookies.find(
        (cookie: Cookie) => cookie.name === "__userid__"
      )?.value;
      state.cookies.push({
        name: `hmcts-exui-cookies-${userId}-mc-accepted`,
        value: "true",
        domain: `${domain}`,
        path: "/",
        expires: -1,
        httpOnly: false,
        secure: false,
        sameSite: "Lax",
      });
      fs.writeFileSync(sessionPath, JSON.stringify(state, null, 2));
    } catch (error) {
      throw new Error(`Failed to read or write session data: ${error}`);
    }
  }
}
