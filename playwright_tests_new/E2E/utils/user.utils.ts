// This code block will need to be removed when the frameworks supports creating users on the fly
import testConfig from "../../../test_codecept/e2e/config/appTestConfig.js"

export class UserUtils {
  public getUserCredentials(userIdentifier: string) {
    const envUsers = testConfig?.users?.[testConfig.testEnv] || [];
    const user = envUsers.find((u: any) => u.userIdentifier === userIdentifier);

    if (!user) throw new Error(`User "${userIdentifier}" not found`);

    return { email: user.email, password: user.key };
  }
}