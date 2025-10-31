import { test as baseTest } from "@playwright/test";
import getPort from "get-port";
import { PageFixtures, pageFixtures } from "./page-objects/pages";
import { UtilsFixtures, utilsFixtures } from "./utils";

// Gather all fixture types into a common type
export type CustomFixtures = PageFixtures & UtilsFixtures;

// Extend 'test' object using custom fixtures
// Test scoped fixtures are the first template parameter
// Worker scoped fixtures are the second template
export const test = baseTest.extend<CustomFixtures, { lighthousePort: number }>(
  {
    ...pageFixtures,
    ...utilsFixtures,
    // Worker scoped fixtures need to be defined separately
    lighthousePort: [
      async ({}, use) => {
        const port = await getPort();
        await use(port);
      },
      { scope: "worker" },
    ],
  }
);

// If you were extending assertions, you would also import the "expect" property from this file
export const expect = test.expect;
