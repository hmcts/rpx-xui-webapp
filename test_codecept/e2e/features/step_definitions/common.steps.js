

Then('I see button with label {string}', async function (label) {
    const element = element(by.xpath(`//button[contains(text(),'${label}')]`))
    expect(await element.isDisplayed(), `Button with label ${label} not displayed`).to.be.true;
})

When('I click button with label {string}', async function(label){
    const element = element(by.xpath(`//button[contains(text(),'${label}')]`))
    await element.click();
})
