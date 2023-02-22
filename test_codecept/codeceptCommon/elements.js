

function getActor() {
    return actor();
}


class PuppeteerNativeElement{
    constructor(element, locator){
        this.nativeElement = element;
        this.locator = locator
    }

    elementWithLocator(locator) {
        this.locator = locator
    }


    async getNativeElements(locator) {
        this.page = await getActor().getPuppeteerPage();

        const keys = Object.keys(locator)
        if (keys[0] === 'css') {
            return await this.page.$$(locator[keys[0]])

        } else {
            return await this.page.$$x(locator[keys[0]])
        }
       
    }

    async __checkAndGetNativeElement(){
        this.page = await getActor().getPuppeteerPage();
        if (!this.nativeElement){
            const keys = Object.keys(locator)
            // let nativeElement = await getActor().getNativeElementChild(this.nativeElement, keys[0], locator[keys[0]])
            if (keys[0] === 'css'){
                this.nativeElement = await this.page.$(locator[keys[0]])

            }else{
                this.nativeElement = await this.page.$x(locator[keys[0]])

            }
        }
    }

   
    async getAttribute(attr){
        await this.__checkAndGetNativeElement();
        return await (await this.nativeEelement.getProperty(attribute)).jsonValue()
    }

    async element(locator) {
        await this.__checkAndGetNativeElement();
        const keys = Object.keys(locator)
        if (keys[0] === 'css') {
            return await this.nativeElement.$(locator)
        } else {
            return await this.nativeElement.$x(locator)

        }
    }

    async getTagName(){
        await this.__checkAndGetNativeElement();
        return await (await this.nativeElement.getProperty('tagName')).jsonValue()
    }
}


class ElementCollection {
    constructor(locator) {
        this.nativeElements = []
        this.selector = locator
        this.position = -1;
    }

    async first(){
        await this.count();
        const nativeLement = new PuppeteerNativeElement(this.nativeElements[0], null);
        return nativeLement;
    }

    async get(index){
0
        await this.count();
        if (index >= this.nativeElements.length ){
            throw Error(`Array index out of bound, elements count ${this.nativeElements.length} , index to get ${index}`);
        }

        const nativeLement = new PuppeteerNativeElement(this.nativeElements[index], null);
        return nativeLement;

    }

    async count(){
        const helperNativeElement = new PuppeteerNativeElement(null,null)
        this.nativeElements = await helperNativeElement.getNativeElements(this.selector);
        return this.nativeElements.length
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
        return count.length > 0
    }

    async isEnabled(){
        const isDisabled = await getActor().grabAttributeFrom(this.selector, 'disabled');
        return !isDisabled
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
        const elements = new ElementCollection(this.selector) 
        return await elements.count()
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


module.exports = { Element, ElementCollection}