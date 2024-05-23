import { Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import {
  Panel2,
  Panel3,
} from "../panelComposition/casePanelCompositionPage.ts";
import commonHelpers, {
  hearingVenues,
  caseRegionCode,
  hearingType,
  hearingFormat,
  hearingSession,
} from "../../../helpers/commonHelpers.ts";
import hearingsTab_content from "../../../fixtures/content/CaseAPI/caseTabs/hearingsTab_content.ts";
import casePanelComposition_content from "../../../fixtures/content/CaseAPI/panelComposition/casePanelComposition_content.ts";
import createListingListingDetailsContent from "../../../fixtures/content/CaseAPI/createListing/createListingListingDetails_content.ts";
import createListingRemoteHearingInformationContent from "../../../fixtures/content/CaseAPI/createListing/createListingRemoteHearingInformation_content.ts";
import createListingOtherInformationContent from "../../../fixtures/content/CaseAPI/createListing/createListingOtherInformation_content.ts";

type HearingsTabPage = {
  hearingsTab: string;
  listingTable: string;
  checkPageLoads(
    page: Page,
    region: boolean,
    hearingAcrossMultipleDays: boolean,
    readyToList: boolean,
    venue: hearingVenues | null,
    accessibilityTest: boolean,
  ): Promise<void>;
  changeToHearingsTab(page: Page): Promise<void>;
  checkPanelComposition(
    page: Page,
    panel2: Panel2,
    panel3: Panel3,
    specialisms: boolean,
  ): Promise<void>;
  checkValidInfo(
    page: Page,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
    hearingSession: hearingSession,
    hearingAcrossMultipleDays: boolean,
    readyToList: boolean,
    venue: hearingVenues | null,
  ): Promise<void>;
};

const hearingTabPage: HearingsTabPage = {
  hearingsTab: ".mat-tab-label-content",
  listingTable:
    "table > tbody > tr > td > span > ccd-field-read > div > ccd-field-read-label > div > ",

  async checkPageLoads(
    page: Page,
    region: boolean,
    hearingAcrossMultipleDays: boolean,
    readyToList: boolean,
    venue: hearingVenues | null,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `div.case-viewer-label:text-is("${hearingsTab_content.title}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span.text-16:text-is("${hearingsTab_content.subtitle2}")`,
        ),
        1,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (hearingsTab_content as any)[
          `textOnPage${index + 5}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`span.text-16:text-is("${textOnPage}")`),
          1,
        );
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span.text-16:text-is("${hearingsTab_content.textOnPage12}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span.text-16:text-is("${hearingsTab_content.textOnPage14}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${hearingsTab_content.textOnPage15}")`),
        2,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span.text-16:text-is("${hearingsTab_content.textOnPage16}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span.text-16:text-is("${hearingsTab_content.textOnPage17}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span.text-16:text-is("${hearingsTab_content.textOnPage19}")`,
        ),
        1,
      ),
      ...Array.from({ length: 3 }, (_, index) => {
        const textOnPage = (hearingsTab_content as any)[
          `textOnPage${index + 21}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`span.text-16:text-is("${textOnPage}")`),
          1,
        );
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `markdown > h4:text-is("${hearingsTab_content.subtitle3}")`,
        ),
        1,
      ),
    ]);
    if (region) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span.text-16:text-is("${hearingsTab_content.textOnPage11}")`,
        ),
        1,
      );
    }
    if (hearingAcrossMultipleDays) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `span.text-16:text-is("${hearingsTab_content.textOnPage20}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `dl.complex-panel-title > dt > span.text-16:has-text("${hearingsTab_content.additionalHearingDateTitle}")`,
          ),
          3,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `#complex-panel-simple-field-label > span.text-16:text-is("${hearingsTab_content.additionalHearingDate}")`,
          ),
          3,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `#complex-panel-simple-field-label > span.text-16:text-is("${hearingsTab_content.additionalHearingDateTime}")`,
          ),
          3,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `#complex-panel-simple-field-label > span.text-16:text-is("${hearingsTab_content.textOnPage18}")`,
          ),
          4,
        ),
      ]);
    } else {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#complex-panel-simple-field-label > span.text-16:text-is("${hearingsTab_content.textOnPage18}")`,
        ),
        1,
      );
    }
    if (readyToList) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span.text-16:text-is("${hearingsTab_content.shortHearing}")`,
        ),
        1,
      );
    }
    if (venue) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${hearingsTab_content.textOnPage10}")`,
          ),
          2,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `span.text-16:text-is("${hearingsTab_content.textOnPage13}")`,
          ),
          1,
        ),
      ]);
    } else {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span.text-16:text-is("${hearingsTab_content.textOnPage9}")`,
        ),
        1,
      );
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToHearingsTab(page: Page): Promise<void> {
    await page.locator(this.hearingsTab).nth(8).click();
  },

  async checkPanelComposition(
    page: Page,
    panel2: Panel2,
    panel3: Panel3,
    specialisms: boolean,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`h4:text-is("${hearingsTab_content.subtitle1}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${hearingsTab_content.textOnPage1}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("Tribunal Judge")`),
        1,
      ),
    ]);
    if (panel2 !== null) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${hearingsTab_content.textOnPage2}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("${panel2}")`),
          1,
        ),
      ]);
    }
    if (panel3 !== null) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${hearingsTab_content.textOnPage3}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("${panel3}")`),
          1,
        ),
      ]);
    }
    if (specialisms) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${hearingsTab_content.textOnPage4}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `span:text-is("Lorem ipsum ${casePanelComposition_content.textOnPage2}")`,
          ),
          1,
        ),
      ]);
    }
  },

  async checkValidInfo(
    page: Page,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
    hearingSession: hearingSession,
    hearingAcrossMultipleDays: boolean,
    readyToList: boolean,
    venue: hearingVenues | null,
  ): Promise<void> {
    const currentDate = new Date();
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          this.listingTable +
            `ccd-read-fixed-radio-list-field > span:text-is("${hearingsTab_content.listedStatus}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          this.listingTable +
            `ccd-read-fixed-radio-list-field > span:text-is("${hearingType}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          this.listingTable +
            `ccd-read-fixed-radio-list-field > span.text-16:text-is("${hearingFormat}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          this.listingTable +
            `ccd-read-text-field > span.text-16:text-is("${createListingListingDetailsContent.room}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.text-16:text-is("${createListingListingDetailsContent.instructions}")`,
        ),
        2,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          this.listingTable +
            `ccd-read-text-field > span.text-16:text-is("${createListingRemoteHearingInformationContent.videoCallLink}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          this.listingTable +
            `ccd-read-text-field > span.text-16:text-is("${createListingRemoteHearingInformationContent.conferenceCallNumber}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          this.listingTable +
            `ccd-read-text-area-field > span:text-is("${createListingOtherInformationContent.otherInformation}")`,
        ),
        1,
      ),
    ]);
    if (region) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(`span.text-16:text-is("${caseRegionCode}")`),
        1,
      );
    }
    if (!hearingAcrossMultipleDays) {
      if (readyToList) {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("No")`),
          3,
        );
      } else {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`span.text-16:text-is("No")`),
          1,
        );
      }
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            this.listingTable +
              `ccd-read-date-field > span.text-16:text-is("${currentDate.getDate()} ${commonHelpers.months[currentDate.getMonth()].slice(0, 3)} ${currentDate.getFullYear()}")`,
          ),
          2,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            this.listingTable +
              `ccd-read-fixed-radio-list-field > span.text-16:text-is("${hearingSession}")`,
          ),
          1,
        ),
      ]);

      if (hearingSession === "Morning" || hearingSession === "All day") {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            this.listingTable +
              `ccd-read-text-field > span.text-16:text-is("${createListingListingDetailsContent.morningTime}")`,
          ),
          1,
        );
      } else if (hearingSession === "Afternoon") {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            this.listingTable +
              `ccd-read-text-field > span.text-16:text-is("${createListingListingDetailsContent.afternoonTime}")`,
          ),
          1,
        );
      }
    } else {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            this.listingTable +
              `ccd-read-date-field > span.text-16:text-is("${currentDate.getDate()} ${commonHelpers.months[currentDate.getMonth()].slice(0, 3)} ${currentDate.getFullYear()}")`,
          ),
          5,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`span.text-16:text-is("Yes")`),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            this.listingTable +
              `ccd-read-fixed-radio-list-field > span.text-16:text-is("${hearingSession}")`,
          ),
          4,
        ),
      ]);
      if (hearingSession === "Morning" || hearingSession === "All day") {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            this.listingTable +
              `ccd-read-text-field > span.text-16:text-is("${createListingListingDetailsContent.morningTime}")`,
          ),
          4,
        );
      } else if (hearingSession === "Afternoon") {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            this.listingTable +
              `ccd-read-text-field > span.text-16:text-is("${createListingListingDetailsContent.afternoonTime}")`,
          ),
          4,
        );
      }
    }
    if (venue !== null) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            this.listingTable +
              `ccd-read-dynamic-list-field > span.text-16:text-is("${venue}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            this.listingTable +
              `ccd-read-text-field > span.text-16:text-is("${venue}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `td[id='case-viewer-field-read--hearingVenues'] span[class='text-16'] span[class='text-16']:text-is("${venue}")`,
          ),
          1,
        ),
      ]);
    } else {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(`span.text-16:text-is("Venue not listed")`),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            this.listingTable +
              `ccd-read-text-field > span.text-16:text-is("Test Venue")`,
          ),
          1,
        ),
      ]);
    }
  },
};

export default hearingTabPage;
