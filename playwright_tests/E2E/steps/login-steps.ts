import config from "../../config";
import { resolveDynamicUser } from "../../support/dynamic-user-provider";
const testConfig = require("../../../test_codecept/e2e/config/appTestConfig");

export async function signIn(page: any, userIdentifier: string, goToCaseBaseURL: boolean = true) {
  let dynamicUser = null;
  try {
    dynamicUser = await resolveDynamicUser(userIdentifier);
  } catch (error) {
    console.warn(
      `[dynamic-users] Failed to resolve dynamic user "${userIdentifier}": ${
        (error as Error).message
      }. Falling back to static credentials.`
    );
  }

  const matchingUsers =
    dynamicUser === null
      ? testConfig.users[testConfig.testEnv].filter(
        (user: any) => user.userIdentifier === userIdentifier
      )
      : [];

  if (!dynamicUser && matchingUsers.length === 0) {
    throw new Error(
      `Unable to find credentials for user identifier "${userIdentifier}".`
    );
  }

  const email = dynamicUser ? dynamicUser.email : matchingUsers[0].email;
  const password = dynamicUser ? dynamicUser.password : matchingUsers[0].key;

  if (goToCaseBaseURL) await page.goto(config.CaseBaseURL);
  else await page.goto(config.AppBaseURL);
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  console.log("Signed in as " + email);
  
}

export async function signOut(page) {
  try {
    await page.getByText("Sign out").click();
    console.log("Signed out");
  } catch (error) {
    console.log(`Sign out failed: ${error}`);
  }
  
}
