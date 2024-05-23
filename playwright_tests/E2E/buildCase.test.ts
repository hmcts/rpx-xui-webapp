import { test } from "@playwright/test";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import { allEvents } from "../helpers/commonHelpers.ts";

test.describe("Case-API Build case tests. @CaseAPI", () => {
  test("Create and build case as a caseworker", async ({
    page,
  }): Promise<void> => {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    await buildCase.buildCase(
      page,
      previousEvents,
      eventTimes,
      true,
      "caseWorker",
    );
  });
  test("Create and build case as a senior caseworker", async ({
    page,
  }): Promise<void> => {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    await buildCase.buildCase(
      page,
      previousEvents,
      eventTimes,
      false,
      "seniorCaseworker",
    );
  });
  test("Create and build case as a hearing centre admin", async ({
    page,
  }): Promise<void> => {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    await buildCase.buildCase(
      page,
      previousEvents,
      eventTimes,
      false,
      "hearingCentreAdmin",
    );
  });
  test("Create and build case as a hearing centre team lead", async ({
    page,
  }): Promise<void> => {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    await buildCase.buildCase(
      page,
      previousEvents,
      eventTimes,
      false,
      "hearingCentreTeamLead",
    );
  });
});

test("Accessibility test - build case @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  let previousEvents: allEvents[] = [];
  let eventTimes: string[] = [];
  await buildCase.buildCase(
    page,
    previousEvents,
    eventTimes,
    true,
    "caseWorker",
  );
});
