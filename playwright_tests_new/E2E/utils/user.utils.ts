// This code block will need to be removed when the frameworks supports creating users on the fly
import testConfig from '../../common/appTestConfig';

type StaticUser = {
  userIdentifier: string;
  email: string;
  key: string;
};

export class UserUtils {
  private readonly dynamicUserEnvMap: Record<string, { username: string; password: string }> = {
    SOLICITOR: {
      username: 'SOLICITOR_USERNAME',
      password: 'SOLICITOR_PASSWORD',
    },
    PROD_LIKE: {
      username: 'PROD_LIKE_USERNAME',
      password: 'PROD_LIKE_PASSWORD',
    },
    SEARCH_EMPLOYMENT_CASE: {
      username: 'SEARCH_EMPLOYMENT_CASE_USERNAME',
      password: 'SEARCH_EMPLOYMENT_CASE_PASSWORD',
    },
    USER_WITH_FLAGS: {
      username: 'USER_WITH_FLAGS_USERNAME',
      password: 'USER_WITH_FLAGS_PASSWORD',
    },
  };

  public getUserCredentials(userIdentifier: string) {
    const dynamicCredentials = this.getDynamicCredentials(userIdentifier);
    if (dynamicCredentials) {
      return dynamicCredentials;
    }

    const envUsers = testConfig.users[testConfig.testEnv] as StaticUser[];
    const user = envUsers.find((u) => u.userIdentifier === userIdentifier);

    if (!user) {
      throw new Error(`User "${userIdentifier}" not found`);
    }

    return { email: user.email, password: user.key };
  }

  private getDynamicCredentials(userIdentifier: string): { email: string; password: string } | undefined {
    const mapping = this.dynamicUserEnvMap[userIdentifier];
    if (!mapping) {
      return undefined;
    }

    const email = process.env[mapping.username]?.trim();
    const password = process.env[mapping.password];
    if (!email || !password) {
      return undefined;
    }

    return { email, password };
  }
}
