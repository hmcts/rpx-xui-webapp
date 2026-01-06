import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";
import { loadSessionCookies } from '../../../common/sessionCapture';

test.describe("Verify creating case level flags works as expected", () => {
    let testValue = faker.person.firstName();
    let caseNumber: string;
    const jurisdiction = 'EMPLOYMENT';
    const caseType = 'ET_EnglandWales';
    let sessionCookies: any[] = [];
    test.beforeEach(async ({ page, createCasePage }) => {
        const { cookies } = loadSessionCookies('SEARCH_EMPLOYMENT_CASE');
        sessionCookies = cookies;
        if (sessionCookies.length) {
            await page.context().addCookies(sessionCookies);
        }
        await page.goto('/');
        await createCasePage.createCaseEmployment(jurisdiction, caseType, testValue);
        caseNumber = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();
    });

    test("Create a new case flag", async ({ caseDetailsPage, tableUtils }) => {

        await test.step("Check there are no flags already present", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Flags');
            const table = await tableUtils.mapExuiTable(await caseDetailsPage.getTableByName('Case level flags'));
            expect(table[0]).toMatchObject({});
        })

        await test.step("Create a new case flag", async () => {
            await caseDetailsPage.exuiSpinnerComponent.wait();
            await caseDetailsPage.selectCaseAction('Create a case flag');
            await caseDetailsPage.selectCaseFlagTarget('Welsh');
        });

        await test.step("Verify the case level flag is shown in the history tab", async () => {
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

test.describe("Verify creating party level flags works as expected", () => {
    let testValue = faker.person.firstName();
    let caseNumber: string;
    const jurisdiction = 'DIVORCE';
    const caseType = 'xuiCaseFlagsV1';
    let sessionCookies: any[] = [];

    test.beforeEach(async ({ page, createCasePage }) => {
        const { cookies } = loadSessionCookies('USER_WITH_FLAGS');
        sessionCookies = cookies;
        if (sessionCookies.length) {
            await page.context().addCookies(sessionCookies);
        }
        await page.goto('/');
        await createCasePage.createCaseFlagDivorceCase(testValue, jurisdiction, caseType);
        caseNumber = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();
    });

    test("Create a new case level flag", async ({ caseDetailsPage, tableUtils }) => {

        await test.step("Check there are no flags already present", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Flags');
            const table = await tableUtils.mapExuiTable(await caseDetailsPage.getTableByName(testValue));
            expect(table[0]).toMatchObject({});
        })

        await test.step("Create a new case flag", async () => {
            await caseDetailsPage.exuiSpinnerComponent.wait();
            await caseDetailsPage.selectCaseAction('Create case flag');
            await caseDetailsPage.selectPartyFlagTarget(testValue, 'Welsh');
        });

        await test.step("Check the case flag alert messages are seen", async () => {
            expect.soft(await caseDetailsPage.caseAlertMessage.innerText()).toContain(`Case ${caseNumber} has been updated with event: Create case flag`);
            expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
            expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toContain('There is 1 active flag on this case.');
        });

        await test.step("Verify the party level case flag is shown in the history tab", async () => {
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
