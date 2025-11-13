import config from "../config";
import { isDynamicUserCreationEnabled } from "../support/env.utils";
import { test, expect } from "./fixtures/dynamic-users";

const dynamicUsersEnabled = isDynamicUserCreationEnabled();

test.describe("Dynamic user login POC", () => {
  test.skip(
    !dynamicUsersEnabled,
    "Set USE_DYNAMIC_PLAYWRIGHT_USERS=true to run this proof-of-concept."
  );

  test("solicitor can sign in using a freshly created IDAM account", async ({
    page,
    dynamicUser,
  }) => {
    const user = await dynamicUser("POC_SOLICITOR");
    if (!user) {
      test.skip(
        "Dynamic user definition for SOLICITOR is not available; skipping."
      );
      return;
    }

    await page.goto(config.CaseBaseURL);
    await page.getByLabel("Email address").fill(user.email);
    await page.getByLabel("Password").fill(user.password);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(
      page.getByRole("heading", { name: "Case list" })
    ).toBeVisible();

    await page.getByText("Sign out").click();
  });
});
