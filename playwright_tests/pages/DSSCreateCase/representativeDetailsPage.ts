import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import representativeDetailsContent from "../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";

type RepresentativeDetailsPage = {
  fields: {
    fullName: string;
    representativeOrgName: string;
    representativeContactNumber: string;
    representativeEmailAddress: string;
  };
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const representativeDetailsPage: RepresentativeDetailsPage = {
  fields: {
    fullName: "#representativeFullName",
    representativeOrgName: "#representativeOrganisationName",
    representativeContactNumber: "#representativeContactNumber",
    representativeEmailAddress: "#representativeEmailAddress",
  },

  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            representativeDetailsContent.pageTitleCy,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representativeDetailsContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(
              page.locator(".govuk-body").nth(index + 4),
            ).toHaveText(textOnPage);
          }),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (representativeDetailsContent as any)[
              `subHeadingCy${index + 1}`
            ];
            return expect(page.locator(".govuk-label").nth(index)).toHaveText(
              textOnPage,
            );
          }),
        ]);
        break;
      default:
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            representativeDetailsContent.pageTitle,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representativeDetailsContent as any)[
              `textOnPage${index + 1}`
            ];
            return expect(
              page.locator(".govuk-body").nth(index + 4),
            ).toHaveText(textOnPage);
          }),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (representativeDetailsContent as any)[
              `subHeading${index + 1}`
            ];
            return expect(page.locator(".govuk-label").nth(index)).toHaveText(
              textOnPage,
            );
          }),
        ]);
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.fill(
      this.fields.fullName,
      representativeDetailsContent.fullName,
    );
    await page.fill(
      this.fields.representativeOrgName,
      representativeDetailsContent.Organisation,
    );
    await page.fill(
      this.fields.representativeContactNumber,
      representativeDetailsContent.contactNumber,
    );
    await page.fill(
      this.fields.representativeEmailAddress,
      representativeDetailsContent.emailAddress,
    );
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, cy: boolean): Promise<void> {
    switch (cy) {
      case true:
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            representativeDetailsContent.errorBannerCy,
          ),
          expect(page.locator("[href='#representativeFullName']")).toHaveText(
            representativeDetailsContent.fullNameErrorCy,
          ),
          expect(
            page.locator("[href='#representativeOrganisationName']"),
          ).toHaveText(representativeDetailsContent.organisationNameErrorCy),
          expect(
            page.locator("[href='#representativeContactNumber']"),
          ).toHaveText(representativeDetailsContent.validContactNumberErrorCy),
          expect(
            page.locator("[href='#representativeEmailAddress']"),
          ).toHaveText(representativeDetailsContent.validEmailErrorCy),
          expect(page.locator("#representativeFullName-error")).toContainText(
            representativeDetailsContent.fullNameErrorCy,
          ),
          expect(
            page.locator("#representativeOrganisationName-error"),
          ).toContainText(representativeDetailsContent.organisationNameErrorCy),
          expect(
            page.locator("#representativeContactNumber-error"),
          ).toContainText(
            representativeDetailsContent.validContactNumberErrorCy,
          ),
          expect(
            page.locator("#representativeEmailAddress-error"),
          ).toContainText(representativeDetailsContent.validEmailErrorCy),
        ]);
        await page.fill(
          this.fields.representativeEmailAddress,
          representativeDetailsContent.partEmailErrorCy,
        );
        await page.click(this.continueButton);
        await Promise.all([
          expect(
            page.locator("[href='#representativeEmailAddress']"),
          ).toHaveText(representativeDetailsContent.partEmailErrorCy),
          expect(
            page.locator("#representativeEmailAddress-error"),
          ).toContainText(representativeDetailsContent.partEmailErrorCy),
        ]);
        await page.fill(this.fields.representativeEmailAddress, "");
        break;
      default:
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            representativeDetailsContent.errorBanner,
          ),
          expect(page.locator("[href='#representativeFullName']")).toHaveText(
            representativeDetailsContent.fullNameError,
          ),
          expect(
            page.locator("[href='#representativeOrganisationName']"),
          ).toHaveText(representativeDetailsContent.organisationNameError),
          expect(
            page.locator("[href='#representativeContactNumber']"),
          ).toHaveText(representativeDetailsContent.validContactNumberError),
          expect(
            page.locator("[href='#representativeEmailAddress']"),
          ).toHaveText(representativeDetailsContent.validEmailError),
          expect(page.locator("#representativeFullName-error")).toContainText(
            representativeDetailsContent.fullNameError,
          ),
          expect(
            page.locator("#representativeOrganisationName-error"),
          ).toContainText(representativeDetailsContent.organisationNameError),
          expect(
            page.locator("#representativeContactNumber-error"),
          ).toContainText(representativeDetailsContent.validContactNumberError),
          expect(
            page.locator("#representativeEmailAddress-error"),
          ).toContainText(representativeDetailsContent.validEmailError),
        ]);
        await page.fill(
          this.fields.representativeEmailAddress,
          representativeDetailsContent.partEmailEntry,
        );
        await page.click(this.continueButton);
        await Promise.all([
          expect(
            page.locator("[href='#representativeEmailAddress']"),
          ).toHaveText(representativeDetailsContent.partEmailError),
          expect(
            page.locator("#representativeEmailAddress-error"),
          ).toContainText(representativeDetailsContent.partEmailError),
        ]);
        await page.fill(this.fields.representativeEmailAddress, "");
        break;
    }
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default representativeDetailsPage;
