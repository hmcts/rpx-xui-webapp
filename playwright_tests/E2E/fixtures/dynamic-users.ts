import { test as base } from "@playwright/test";
import type { DynamicUser } from "../../support/dynamic-user-factory";
import { resolveDynamicUser } from "../../support/dynamic-user-provider";
import { isDynamicUserCreationEnabled } from "../../support/env.utils";

type DynamicUserFixtures = {
  /**
   * Convenience helper that creates (or retrieves) a dynamic user for the given identifier.
   */
  dynamicUser: (identifier: string) => Promise<DynamicUser | null>;
};

export const test = base.extend<DynamicUserFixtures>({
  dynamicUser: async ({}, use) => {
    if (!isDynamicUserCreationEnabled()) {
      await use(async () => null);
      return;
    }

    await use(async (identifier: string) => {
      return resolveDynamicUser(identifier);
    });
  },
});

export { expect } from "@playwright/test";
