import { test } from "@playwright/test";
import createCase from "../journeys/CaseAPI/createCase.ts";

test.describe("Case-API Create case tests. @CaseAPI", () => {
  test("Caseworker - Assessment - Fatal Category, Email Contact, multiple documents", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Assessment - Medical Re-opening Category, Email Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Medical Re-opening",
      true,
      true,
      "Email",
      true,
      false,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Assessment - Minor Category, Post Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Minor",
      true,
      true,
      "Post",
      true,
      false,
      "2008",
      "Midlands",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Assessment - Paragraph 26 Category, Post Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Paragraph 26",
      false,
      true,
      "Post",
      true,
      true,
      "2012",
      "North East",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Assessment - Sexual Abuse Category, Email Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Sexual Abuse",
      true,
      true,
      "Email",
      true,
      false,
      "1996",
      "North West",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Assessment - Special Jurisdiction Category, Email Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Special Jurisdiction",
      true,
      true,
      "Email",
      true,
      true,
      "2001",
      "Wales & South West",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Eligibility - Other Category, Email Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Email",
      true,
      false,
      "2008",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Eligibility - Fatal Category, Post Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Fatal",
      true,
      true,
      "Post",
      true,
      false,
      "1996",
      "London",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Eligibility - Medical Re-opening Category, Email Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Medical Re-opening",
      true,
      true,
      "Email",
      true,
      false,
      "2012",
      "Midlands",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Eligibility - Minor Category, Post Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Minor",
      true,
      true,
      "Post",
      true,
      false,
      "2001",
      "North East",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Eligibility - Paragraph 26 Category, Post Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Paragraph 26",
      true,
      true,
      "Post",
      true,
      false,
      "1996",
      "North West",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Eligibility - Sexual Abuse Category, Email Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Sexual Abuse",
      true,
      true,
      "Email",
      true,
      false,
      "2008",
      "Wales & South West",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Assessment - Other Category, Email Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      false,
      "2012",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Eligibility - Other Category, Post Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Post",
      true,
      false,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Caseworker - Assessment - Other Category, Post Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Post",
      true,
      false,
      "1996",
      "Midlands",
      true,
      false,
      true,
      false,
      true,
    );
  });

  test("Senior Caseworker - Assessment - Other Category, Post Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "seniorCaseworker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Post",
      true,
      false,
      "1996",
      "Midlands",
      true,
      true,
      true,
      true,
      true,
    );
  });

  test("Hearing centre admin - Eligibility - Other Category, Email Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "hearingCentreAdmin",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Post",
      true,
      false,
      "1996",
      "Midlands",
      true,
      true,
      true,
      true,
      true,
    );
  });

  test("hearing Centre Team Lead - Assessment - Other Category, Email Contact", async ({
    page,
  }) => {
    await createCase.createCase(
      page,
      "hearingCentreTeamLead",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      false,
      "1996",
      "Midlands",
      true,
      true,
      true,
      true,
      true,
    );
  });
});

test("Accessibility test every page. @accessibilityCaseAPI", async ({
  page,
}) => {
  await createCase.createCase(
    page,
    "caseWorker",
    true,
    "Assessment",
    "Other",
    true,
    true,
    "Email",
    true,
    false,
    "1996",
    "Scotland",
    true,
    true,
    true,
    true,
    true,
  );
});
