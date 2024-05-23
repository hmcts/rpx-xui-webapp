import { test } from "@playwright/test";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";
import updateCaseJourney from "../journeys/DSSUpdateCase/updateCase.ts";

test.describe("DSS Update case tests. @DSSUpdate", () => {
  test("Check for an existing case to update, upload one document and additional information.", async ({
    page,
  }) => {
    const caseNumber: string | void =
      await createFEApplication.createFEApplication(
        page,
        false,
        false,
        false,
        true,
        false,
        true,
        false,
        false,
        false,
      );

    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber,
      true,
      true,
      false,
      false,
      false,
    );
  });

  test("Check for an existing case to update, upload one document and additional information - CY", async ({
    page,
  }) => {
    const caseNumber: string | void =
      await createFEApplication.createFEApplication(
        page,
        false,
        false,
        false,
        true,
        false,
        true,
        false,
        false,
        false,
      );

    await updateCaseJourney.updateCase(
      page,
      true,
      false,
      caseNumber,
      true,
      true,
      false,
      false,
      false,
    );
  });

  test("Check for an existing case to update, upload multiple documents and additional information", async ({
    page,
  }) => {
    const caseNumber: string | void =
      await createFEApplication.createFEApplication(
        page,
        false,
        false,
        false,
        true,
        false,
        true,
        false,
        false,
        false,
      );
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber,
      true,
      true,
      true,
      false,
      false,
    );
  });

  test("Check for an existing case to update, upload one document and no additional information", async ({
    page,
  }) => {
    const caseNumber: string | void =
      await createFEApplication.createFEApplication(
        page,
        false,
        false,
        false,
        true,
        false,
        true,
        false,
        false,
        false,
      );
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber,
      false,
      true,
      false,
      false,
      false,
    );
  });

  test("Check for an existing case to update, upload no documents and additional information", async ({
    page,
  }) => {
    const caseNumber: string | void =
      await createFEApplication.createFEApplication(
        page,
        false,
        false,
        false,
        true,
        false,
        true,
        false,
        false,
        false,
      );
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber,
      true,
      false,
      false,
      false,
      false,
    );
  });

  test("Test all back buttons on the Update Case application", async ({
    page,
  }) => {
    const caseNumber: string | void =
      await createFEApplication.createFEApplication(
        page,
        false,
        false,
        false,
        true,
        false,
        true,
        false,
        false,
        false,
      );
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber,
      true,
      true,
      false,
      true,
      false,
    );
  });

  test("Error messaging", async ({ page }) => {
    const caseNumber: string | void =
      await createFEApplication.createFEApplication(
        page,
        false,
        false,
        false,
        true,
        false,
        true,
        false,
        false,
        false,
      );
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber,
      true,
      true,
      false,
      false,
      true,
    );
  });

  test("Error messaging - CY", async ({ page }) => {
    const caseNumber: string | void =
      await createFEApplication.createFEApplication(
        page,
        false,
        false,
        false,
        true,
        false,
        true,
        false,
        false,
        false,
      );
    await updateCaseJourney.updateCase(
      page,
      true,
      false,
      caseNumber,
      true,
      true,
      false,
      false,
      true,
    );
  });
});

test("Check for an existing case to update - aXe test as it proceeds. @UpdateAccessibility", async ({
  page,
}) => {
  const caseNumber: string | void =
    await createFEApplication.createFEApplication(
      page,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    );
  await updateCaseJourney.updateCase(
    page,
    false,
    true,
    caseNumber,
    true,
    true,
    false,
    false,
    false,
  );
});
