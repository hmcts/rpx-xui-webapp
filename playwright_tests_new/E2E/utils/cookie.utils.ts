import * as fs from "fs";
import { Cookie } from "playwright-core";
import { config } from "./config.utils.js";

type FileSystem = Pick<typeof fs, "readFileSync" | "writeFileSync" | "existsSync" | "mkdirSync">;

export class CookieUtils {
  private readonly fs: FileSystem;

  public constructor(fsImpl: FileSystem = fs) {
    this.fs = fsImpl;
  }
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
      const state = JSON.parse(this.fs.readFileSync(sessionPath, "utf-8"));
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
      this.fs.writeFileSync(sessionPath, JSON.stringify(state, null, 2));
    } catch (error) {
      throw new Error(`Failed to read or write session data: ${error}`);
    }
  }

  /**
   * Write a fresh session file containing provided cookies and an appended manage cases analytics cookie.
   * Performs a single write (instead of write + mutate). Accepts raw cookies array from Playwright context.
   */
  public writeManageCasesSession(sessionPath: string, cookies: Cookie[]): void {
    try {
      // Ensure directory exists
      const dir = sessionPath.substring(0, sessionPath.lastIndexOf('/'));
      if (dir && !this.fs.existsSync(dir)) {
        this.fs.mkdirSync(dir, { recursive: true });
      }
      const domain = (config.urls.exuiDefaultUrl as string).replace("https://", "");
      const userId = cookies.find(c => c.name === "__userid__")?.value;
      if (userId) {
        cookies.push({
          name: `hmcts-exui-cookies-${userId}-mc-accepted`,
          value: "true",
          domain,
          path: "/",
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
        });
      }
      const state = { cookies };
      this.fs.writeFileSync(sessionPath, JSON.stringify(state, null, 2), "utf-8");
    } catch (error) {
      throw new Error(`Failed to write session file: ${error}`);
    }
  }
}
