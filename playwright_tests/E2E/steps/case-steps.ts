import config from "../../config"

export async function routeToCasePage(page, caseId: string) {
    const casePageUrl = config.CaseBaseURL + '/case-details/' + caseId;
    console.log("Going to case details page:" + casePageUrl);
    await page.goto(casePageUrl);
}

export async function routeToQueryManagementCase(page, caseId: string) {
  const currentUrl = await page.getCurrentUrl();
  console.log ( "  >>>>>>> ||||||||||   Current url is   >>>>>>> ||||||||||   " + currentUrl);
  //const qmCaseDetails =  config.QMBaseURL + '/case-details/' + caseId;
  const qmCaseDetailsUrl =  currentUrl + '/case-details/' + caseId;

  console.log("Going to FPL Case for QueryManagement -  page:" + qmCaseDetailsUrl);

  await page.goto(qmCaseDetailsUrl);

}
