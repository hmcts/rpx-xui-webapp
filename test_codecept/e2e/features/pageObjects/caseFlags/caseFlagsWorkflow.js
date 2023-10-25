

const SelectFlagLocationPage = require('./selectFlagLocationPage')
const SelectFlagTypePage = require('./selectFlagTypePage')
const AddCommentsPage = require('./addCommentsPage')

const ManageCaseFlagsPage = require('./manageCaseFlagsPage')
const UpdateFlagPage = require('./updateFlagPage')
const SearchLanguageInterpreterPage = require('./searchLanguageInterpreterPage')

class CaseFlagsWorkflow{

    constructor(){
        this.nextButton = element(by.xpath(`//button[contains(text(),'Next')]`))
        this.pages = {
            "Where should this flag be added?" : new SelectFlagLocationPage(),
            "Select flag type" : new SelectFlagTypePage(),
            "Add comments for this flag" : new AddCommentsPage(),
            "Manage case flags" : new ManageCaseFlagsPage(),
            "Language Interpreter": new SearchLanguageInterpreterPage()

        }
    }

    addAndGetSelectFlagTypePage(flagType){
        this.pages[flagType] = new SelectFlagTypePage(flagType)
    }

    addAndGetUpdateFlagPage(updateForFlag) {
        this.pages[updateForFlag] = new UpdateFlagPage(updateForFlag)
    }

}

module.exports = new CaseFlagsWorkflow();
