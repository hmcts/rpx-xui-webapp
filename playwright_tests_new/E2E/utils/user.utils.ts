// This code block will need to be removed when the frameworks supports creating users on the fly
import testConfig from '../../common/appTestConfig';
import { getRuntimeUserCredentialEnvMapping, getRuntimeUserCredentials } from './runtimeUserCredentials';

type StaticUser = {
  userIdentifier: string;
  email: string;
  key: string;
};

export class UserUtils {
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
    const runtimeCredentials = getRuntimeUserCredentials(userIdentifier);
    if (runtimeCredentials) {
      return runtimeCredentials;
    }

    const mapping = getRuntimeUserCredentialEnvMapping(userIdentifier);
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
