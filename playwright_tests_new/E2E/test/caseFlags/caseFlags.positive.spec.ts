import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';

test.describe("Case level case flags", () => {
    let testValue = faker.person.firstName();
    let caseNumber: string;
    const jurisdiction = 'EMPLOYMENT';
    const caseType = 'ET_EnglandWales';
    test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
        await ensureAuthenticatedPage(page, 'SEARCH_EMPLOYMENT_CASE', { waitForSelector: 'exui-header' });
        await createCasePage.createCaseEmployment(jurisdiction, caseType, testValue);
        caseNumber = await caseDetailsPage.getCaseNumberFromAlert();
    });

    test("Create a new case level flag and verify the flag is displayed on the case", async ({ caseDetailsPage, tableUtils }) => {

        await test.step("Check there are no flags already present", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Flags');
            const table = await tableUtils.mapExuiTable(await caseDetailsPage.getTableByName('Case level flags'));
            expect.soft(table[0]).toMatchObject({});
        });

        await test.step("Create a new case level flag", async () => {
            await caseDetailsPage.exuiSpinnerComponent.wait();
            await caseDetailsPage.selectCaseAction('Create a case flag');
            await caseDetailsPage.selectCaseFlagTarget('Welsh');
        });

        await test.step("Check the case flag creation messages are seen", async () => {
            expect.soft(await caseDetailsPage.caseAlertSuccessMessage.innerText()).toContain(`Case ${caseNumber} has been updated with event: Create a case flag`);
            expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
            expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toContain('There is 1 active flag on this case.');
        });

        await test.step("Verify the case level flag is shown in the flags tab", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Flags');
            const expectedFlag = {
                "Case flags": 'Welsh forms and communications',
                "Comments": `Welsh`,
                "Creation date": await caseDetailsPage.todaysDateFormatted(),
                "Last modified": '',
                "Flag status": 'ACTIVE',
            };
            const table = await tableUtils.mapExuiTable(await caseDetailsPage.getTableByName('Case level flags'));
            expect(table[0]).toMatchObject(expectedFlag);
        });
    });
});

test.describe("Party level case flags", () => {
    let testValue = faker.person.firstName();
    let caseNumber: string;
    const jurisdiction = 'DIVORCE';
    const caseType = 'xuiCaseFlagsV1';
    test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
        await ensureAuthenticatedPage(page, 'USER_WITH_FLAGS', { waitForSelector: 'exui-header' });
        await createCasePage.createDivorceCaseFlag(testValue, jurisdiction, caseType);
        caseNumber = await caseDetailsPage.getCaseNumberFromAlert();
    });

    test("Create a new party level flag and verify the flag is displayed on the case", async ({ caseDetailsPage, tableUtils }) => {

        await test.step("Check there are no flags already present", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Flags');
            const table = await tableUtils.mapExuiTable(await caseDetailsPage.getTableByName(testValue));
            expect.soft(table[0]).toMatchObject({});
        })

        await test.step("Create a new party level flag", async () => {
            await caseDetailsPage.exuiSpinnerComponent.wait();
            await caseDetailsPage.selectCaseAction('Create case flag');
            await caseDetailsPage.selectPartyFlagTarget(testValue, 'Welsh');
        });

        await test.step("Check the case flag creation messages are seen", async () => {
            expect.soft(await caseDetailsPage.caseAlertSuccessMessage.innerText()).toContain(`Case ${caseNumber} has been updated with event: Create case flag`);
            expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
            expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toContain('There is 1 active flag on this case.');
        });

        await test.step("Verify the party level case flag is shown in the flags tab", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Flags');
            const expectedFlag = {
                "Party level flags": 'I want to speak Welsh at a hearing',
                "Comments": `Welsh ${testValue}`,
                "Creation date": await caseDetailsPage.todaysDateFormatted(),
                "Last modified": '',
                "Flag status": 'ACTIVE',
            };
            const table = await tableUtils.mapExuiTable(await caseDetailsPage.getTableByName(testValue));
            expect(table[0]).toMatchObject(expectedFlag);
        });
    });
});
