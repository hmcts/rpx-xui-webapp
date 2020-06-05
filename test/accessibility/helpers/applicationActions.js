

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



}

module.exports = new ManageOrgPallyActions();