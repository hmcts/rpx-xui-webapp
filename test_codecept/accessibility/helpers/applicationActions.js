

const PallyActions = require('./pallyActions');
const {conf} = require('../config/config');


class ManageOrgPallyActions {


    idamLogin(username, password) {
        return [
            ...PallyActions.waitForPageWithCssLocator('#username'),
            ...PallyActions.inputField('#username',username),
            ...PallyActions.inputField('#password', password),
            ...PallyActions.clickElement('input.button')

        ];
    }

    startCaseCreation(jurisdiction, caseType,event){
        return [
            ...PallyActions.navigateTourl(conf.baseUrl + "cases/case-filter"),
            ...PallyActions.waitForPageWithCssLocator("ccd-create-case-filters"),
            // ...PallyActions.waitForPageWithCssLocator("#cc-jurisdiction option[value='" + jurisdiction + "']"),

            ...PallyActions.waitForPageWithCssLocatorPresent("#cc-jurisdiction option[value='" + jurisdiction+"']"),
            ...PallyActions.clickElement("#cc-jurisdiction option[value='" + jurisdiction + "']"),

            ...PallyActions.clickElement("#cc-case-type option[value='" + caseType + "']"),
            ...PallyActions.clickElement("#cc-event option[value='" + event + "']"),

            ...PallyActions.clickElement('input.button'),
            ...PallyActions.waitForUrlNotTobe(conf.baseUrl + "cases/case-filter")

        ];
    }



}

module.exports = new ManageOrgPallyActions();