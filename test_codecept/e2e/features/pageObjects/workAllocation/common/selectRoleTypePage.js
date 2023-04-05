
const { LOG_LEVELS } = require("../../../../support/constants");
const BrowserWaits = require("../../../../support/customWaits");
const CucucmberReporter = require("../../../../../codeceptCommon/reportLogger");
class SelectRoleTypePage{
    constructor(){
        this.container = $("exui-task-assignment-choose-role");
        this.header = $("exui-task-assignment-choose-role h1");
        this.headerCaption = $("exui-task-assignment-choose-role h1 span");
        this.roleSelectQuestion = $("exui-task-assignment-choose-role exui-choose-radio-option p");

        this.rolesRadios = $$("exui-task-assignment-choose-role exui-choose-radio-option fieldset div .govuk-radios__item"); 
    }

    async amOnPage(){
        try{
            await BrowserWaits.waitForElement(this.container);
            return true;
        }catch(err){
            await CucucmberReporter.AddMessage(err, LOG_LEVELS.Error);
            return false;
        }
    }


    async getRoleTypesElements(){
        const countOfRoles = await this.rolesRadios.count();
           const rolesElements = {}; 
        for (let i = 0; i < countOfRoles;i++ ){
            const roleElement = await this.rolesRadios.get(i);
            let label = await roleElement.$("label").getText();;
            label = label.trim(); 
            rolesElements[label] = roleElement.$("input");
        }
        return rolesElements;
    }

    async getRoleTypes(){
        const rolesTypeElements = await this.getRoleTypesElements();
        return Object.keys(rolesTypeElements) ;
    }

    async getRoleTypeElement(roleType){
        const rolesTypeElements = await  this.getRoleTypesElements();
        return rolesTypeElements[roleType];
    }

    async selectRoleType(roleType){
        const roleTypeInput = await this.getRoleTypeElement(roleType);
        await roleTypeInput.click();
    }
}

module.exports = new SelectRoleTypePage();
