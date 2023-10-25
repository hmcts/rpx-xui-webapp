

class UpdateFlagPage {
    constructor(updateFlagFor) {
        this.container = element(by.xpath(`//ccd-update-flag//label[contains(text(),'${updateFlagFor}')]`))

        this.updateFlagFor = updateFlagFor;
        this.fieldMapping = {
            "Flag status": element(by.xpath(`//div[contains(@id,'flag-status-container')]`))
        }
        this.fieldMapping[this.updateFlagFor] = element(by.xpath(`//ccd-update-flag//label[contains(text(),'${updateFlagFor} comments')]`))
    }


    async inputValue(field, value) {

        if (field.includes('Update flag')) {
            const ele = element(by.xpath(`//ccd-update-flag//label[contains(text(),'${field}')]/../textarea`))
            await ele.sendKeys(value)
        } else if (field.includes('Flag status')) {

            const ele = element(by.xpath(`//button[contains(text(),'Make inactive')]`))
            if(value.toLowerCase().includes('inactive')){
                ele.click();
            }
           
        }
    }


}
module.exports = UpdateFlagPage

