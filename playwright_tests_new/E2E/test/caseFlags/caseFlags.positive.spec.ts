import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";
import { loadSessionCookies } from '../../../common/sessionCapture';

test.describe("Verify creating party level case flags works as expected", () => {
    let testValue = faker.person.firstName();
    let caseNumber: string;

    const userIdentifier = 'USER_WITH_FLAGS';
    const jurisdiction = 'DIVORCE';
    const caseType = 'xuiCaseFlagsV1';
    let sessionCookies: any[] = [];


    test.beforeEach(async ({ page, createCasePage, config }) => {
        const { cookies } = loadSessionCookies(userIdentifier);
        sessionCookies = cookies;
        if (sessionCookies.length) {
            await page.context().addCookies(sessionCookies);
        }
        await page.goto('/');
        await createCasePage.createCaseFlagDivorceCase(testValue, jurisdiction, caseType);
        caseNumber = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();
    });

    test("Create a new applicant case flag ", async ({ caseDetailsPage, tableUtils }) => {
        await test.step("Check there are no flags already present", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Flags');
            const table = await tableUtils.mapExuiTable(await caseDetailsPage.getPartyNameTable(testValue));
            expect(table[0]).toMatchObject({});
        })
            
            await test.step("Create a new case flag", async () => {
            await caseDetailsPage.exuiSpinnerComponent.wait();
            await caseDetailsPage.selectCaseAction('Create case flag');
            await caseDetailsPage.selectFlagTarget(testValue, 'Welsh');
        });

        await test.step("Check the case flag alert messages are seen", async () => {
            expect.soft(await caseDetailsPage.caseAlertMessage.innerText()).toContain(`Case ${caseNumber} has been updated with event: Create case flag`);
            expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
            expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toContain('There is 1 active flag on this case.');
        });

        await test.step("Verify the case flag is shown in the history tab", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Flags');
            const expectedFlag = {
                "Party level flags": 'I want to speak Welsh at a hearing',
                "Comments": `Welsh ${testValue}`,
                "Creation date": await caseDetailsPage.todaysDateFormatted(),
                "Last modified": '',
                "Flag status": 'ACTIVE',
            };
            const table = await tableUtils.mapExuiTable(await caseDetailsPage.getPartyNameTable(testValue));
            expect(table[0]).toMatchObject(expectedFlag);        
        });
    });
});


//IAC_CaseOfficer_R1 
// party level case flag 
// xuiTestCaseType
