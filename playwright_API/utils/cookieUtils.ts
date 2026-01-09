import * as fs from "fs";
import { Cookie } from "playwright-core";

export class CookieUtils {

  /**
   * Write a fresh session file containing provided cookies and an appended manage cases analytics cookie.
   * Performs a single write (instead of write + mutate). Accepts raw cookies array from Playwright context.
   */
  
  public writeManageCasesSession(sessionPath: string, cookies: Cookie[]): void {
    try {
      // Ensure directory exists
      const dir = sessionPath.substring(0, sessionPath.lastIndexOf('/'));
      if (dir && !fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const domain = (process.env.TEST_URL as string).replace("https://", "");
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
      fs.writeFileSync(sessionPath, JSON.stringify(state, null, 2), "utf-8");
    } catch (error) {
      throw new Error(`Failed to write session file: ${error}`);
    }
  }
}