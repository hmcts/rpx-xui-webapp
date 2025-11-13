import { v4 as uuidv4 } from "uuid";
import {
  type DynamicUserDefinition,
  type DynamicUserIdentifier,
} from "./dynamic-user-definitions";
import { recordDynamicUser } from "./dynamic-user-audit";
import { getEnvVar } from "./env.utils";
import {
  IdamClient,
  type CreatedIdamUser,
} from "./idam-client";

export interface DynamicUser {
  identifier: DynamicUserIdentifier;
  email: string;
  password: string;
  idamId: string;
  forename: string;
  surname: string;
  roleNames: string[];
}

export interface DynamicUserFactoryOptions {
  bearerToken: string;
}

export class DynamicUserFactory {
  private readonly cache = new Map<string, DynamicUser>();
  private readonly idamClient: IdamClient;

  constructor(private readonly options: DynamicUserFactoryOptions) {
    this.idamClient = new IdamClient();
  }

  public async getOrCreate(
    definition: DynamicUserDefinition
  ): Promise<DynamicUser> {
    const cached = this.cache.get(definition.identifier);
    if (cached) {
      return cached;
    }

    const created = await this.create(definition);
    this.cache.set(definition.identifier, created);
    return created;
  }

  private async create(
    definition: DynamicUserDefinition
  ): Promise<DynamicUser> {
    const uniqueId = uuidv4();
    const [firstPart, secondPart] = uniqueId.split("-");
    const email = `${definition.emailPrefix}.${uniqueId}@test.local`;
    const forename = `${definition.emailPrefix}_fn_${firstPart}`;
    const surname = `${definition.emailPrefix}_ln_${secondPart}`;
    const password = this.resolvePassword(definition);

    const payload = {
      bearerToken: this.options.bearerToken,
      password,
      user: {
        id: uniqueId,
        email,
        forename,
        surname,
        roleNames: [...definition.roleNames],
      },
    };

    const createdUser: CreatedIdamUser = await this.idamClient.createUser(
      payload
    );
    const dynamicUser: DynamicUser = {
      identifier: definition.identifier,
      email: createdUser.email,
      password,
      idamId: createdUser.id,
      forename,
      surname,
      roleNames: [...definition.roleNames],
    };

    await recordDynamicUser({
      identifier: definition.identifier,
      email,
      forename,
      surname,
      roleNames: [...definition.roleNames],
      createdAt: new Date().toISOString(),
    });

    console.info(
      `[dynamic-users] Created ${definition.identifier} user ${email} (${dynamicUser.idamId}).`
    );

    return dynamicUser;
  }

  private resolvePassword(definition: DynamicUserDefinition): string {
    const envPassword = getEnvVar(definition.passwordEnv);
    if (envPassword) {
      return envPassword;
    }
    const fallback = getEnvVar("DEFAULT_TEST_USER_PASSWORD");
    if (fallback) {
      return fallback;
    }
    return definition.fallbackPassword ?? "Password12!";
  }
}
