const { promise } = require("protractor");
const { object } = require("underscore");


function getActor() {
    return actor();
}

class ElementCollection {
    constructor(locator) {
        this.selector = locator
    }

    first() {

    }
}

class Element {

    constructor(selector) {
        this.selector = selector
    }

    wait() {
        getActor().waitForElement(this.selector, 60)
    }

    locator() {
        return this.selector
    }

    async getText(){
        return await getActor().grabTextFrom(this.selector) 
    }

    sendKeys(keys){
        getActor().fillField(this.selector, keys) 
    }

    clear(){
        getActor().clearField(this.selector)  
    }

    async click(){
        await getActor().click(this.selector)  
    }

    async select(option){
        await getActor().selectOption(this.selector,option)
    }

    async isPresent(){
        const count = await getActor().grabTextFromAll(this.selector);
        return count > 0
    }

    async isDisplayed(){
        try{
            await getActor().seeElement(this.selector)
            return true
        }catch(err){
            return false;
        }
        
    }

    element(locator){
        return new Element(locator)
    }

    $(locator) {
        return new Element(locator)
    }
    $$(locator) {
        return new Element(locator)
    }

    async count(){
        const elements = await getActor().grabTextFromAll(this.selector) 
        return elements.length
    }

    async get(index){
        return new Element(locate(this.selector).at(index+1)) 
    }

    async getAttribute(attr){
        const attributeValue = await getActor().grabAttributeFrom(this.selector, attr)
        if (attributeValue instanceof Object){
            const values = Object.values(attributeValue)
            let attributeItemValues = ''
            for (const prop of values){
                const v = await getActor().grabCssPropertyFrom(this.selector, prop)
                attributeItemValues = `${prop}: ${v};`;      
            }
            return attributeItemValues 
        }else{
            return attributeValue 
        }
        
        
    }

    static all(locator) {
        return new ElementCollection(locator)
    }
    
}


module.exports = Element