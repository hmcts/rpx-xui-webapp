





function getActor() {
    return actor().retry({ retries: 3, minTimeout: 30 });
}



class PuppeteerNativeElement {
    constructor(locator ,parent){
       
        this.type = 'element'

        this.nativeElement = null;
        this.selector = locator;
        this.parent = parent
       
        this.meta = this.getElementSelector()
    }

    getElementSelector(){
        const selectors = [];
        const parentSelectors = this.parent ? this.parent.getElementSelector() : null
        if (this.parent){
            const parentSelectors = this.parent.getElementSelector();
            selectors.push(...parentSelectors)
        }
        const keys = Object.keys(this.selector)
        if (keys.includes('css') || keys.includes('xpath')){
            selectors.push(this.selector)
        }else{
            selectors.push({ index: this.selector })
        }
        return selectors
    }

    async getNativeElements(locator) {
        this.page = await getActor().getPuppeteerPage();

        const keys = Object.keys(locator)
        if (keys[0] === 'css') {
            return await this.page.$$(locator[keys[0]])

        } else {
            return await this.page.$x(locator[keys[0]])
        }
       
    }

    async __checkAndGetNativeElement(){
        let i = 0;
        while(i < 3){
            try {
                this.page = await getActor().getPuppeteerPage();
                let source = null;
                if (this.parent) {
                    if (this.parent.type === 'element') {
                        const parentElement = await this.parent.__checkAndGetNativeElement();
                        source = parentElement;
                    } else if (this.parent.type === 'collection') {
                        const collectionCount = await this.parent.count();
                        if (this.selector >= collectionCount) {
                            throw Error(`Array index out of bound, elements count ${collectionCount} , index to get ${this.selector}`);
                        }
                        source = this.parent.nativeElements
                    }
                } else {
                    source = this.page;
                }
                if (this.selector !== null) {
                    const keys = Object.keys(this.selector)
                    if (keys[0] === 'css') {
                        this.nativeElement = await source.$(this.selector[keys[0]])

                    } else if (keys[0] === 'xpath') {
                        this.nativeElement = await source.$x(this.selector[keys[0]])
                        this.nativeElement = this.nativeElement[0]

                    } else {
                        this.nativeElement = source[this.selector]
                    }
                }
                break;
                
            } catch (err) {
                i++;
                console.log(err)
            }
        }
        return this.nativeElement;
        
        
    }

   
    async getAttribute(attr){
        await this.__checkAndGetNativeElement();
        return await (await this.nativeElement.getProperty(attr)).jsonValue()
    }

    element(locator) {
        return new PuppeteerNativeElement(locator, this)
    }

    $(cssSelector){
        // await this.__checkAndGetNativeElement();
        // let childElement = await this.nativeElement.$(cssSelector) 
        return new PuppeteerNativeElement({ css: cssSelector }, this)
    }

    $$(cssSelector) {
        // await this.__checkAndGetNativeElement();
        // let childElements = await this.nativeElement.$$(cssSelector)
        const collection = new ElementCollection({ css: cssSelector }, this)
        // collection.nativeElements = childElements;
        return collection;
    }


    async getTagName(){
        await this.__checkAndGetNativeElement();

        const tagName = await this.nativeElement.getProperty('tagName');
        return (await tagName.jsonValue()).toLowerCase()
    }

    async isPresent(){
        await this.__checkAndGetNativeElement();
        return this.nativeElement !== null
    }

    async isDisplayed(){
        let i = 0;
        while(i < 0){
            try {
                await this.__checkAndGetNativeElement();
                if (!this.nativeElement) {
                    return false;
                }
                const elementVisisbleBox = await this.nativeElement.boundingBox();

                return elementVisisbleBox !== null
            } catch (err) {
                i++;
            }
        }
       
        
    }

    async sendKeys(keys){
        await this.__checkAndGetNativeElement();
        await this.nativeElement.scrollIntoView();
        await this.click();
        await this.nativeElement.type(keys.toString());
    }

    async clear(){
        await this.__checkAndGetNativeElement();
        await this.page.evaluate((el) => el.value = '', this.nativeElement)
        // await this.nativeElement.type("");
    }

    async click(){
        await this.__checkAndGetNativeElement();
        // await this.nativeElement.scrollIntoView();
        await this.nativeElement.click();
    }


    async selectOptionAtIndex(index){
        await this.__checkAndGetNativeElement();
        const selectOptions = await this.nativeElement.$$('option')
         

        let optionName = await selectOptions[index].evaluate(el => el.textContent, selectOptions[index])
        optionName = optionName.trim()
        // await select.select(optionName);
        await this.nativeElement.type(optionName)
    }

    async selectOptionWithLabel(label) {
        await this.__checkAndGetNativeElement();
        const selectOptions = await this.nativeElement.$$('option')

        await this.nativeElement.type(label)

        // let optionName = await selectOptions[index].evaluate(el => el.textContent, selectOptions[index])

       
        }

    async getText(){
        await this.__checkAndGetNativeElement();
        return await this.nativeElement.evaluate(el => el.textContent, this.nativeElement)
    }

    async uploadFile(filePath){
        await this.__checkAndGetNativeElement();
        await this.nativeElement.uploadFile(filePath);
    }

    async wait(){
        return new Promise((resolve,reject) => {
            const interval = setInterval(async () => {
                await this.__checkAndGetNativeElement();
                if(this.nativeElement !== null){
                    clearInterval(interval)
                    resolve(true)
                }
            }, 1000);

            setTimeout(() => {
                clearInterval(interval)
                reject(false);
            }, 30000)
        });
       
    }

    async scrollIntoView(){
        await this.__checkAndGetNativeElement();
        await this.page.evaluate((el) => el.scrollIntoView(), this.nativeElement)

    }

    async isSelected() {
        await this.__checkAndGetNativeElement();
        return await this.getAttribute('checked')
    }
}


class ElementCollection {
    constructor(locator, parent) {
        this.type = 'collection'

        this.nativeElements = []
        this.selector = locator
        this.position = -1;
        this.parent = parent;
    }

    getElementSelector() {
        const selectors = [];
        if (this.parent) {
            const parentSelectors = this.parent.getElementSelector();
            selectors.push(...parentSelectors)
        }
        selectors.push(this.selector)
        return selectors
    }

    first(){
        // await this.count();
        const nativeLement = new PuppeteerNativeElement(0, null);
        return nativeLement;
    }

    get(index){
0
        // // await this.count();
        // if (index >= this.nativeElements.length ){
        //     throw Error(`Array index out of bound, elements count ${this.nativeElements.length} , index to get ${index}`);
        // }
        const nativeLement = new PuppeteerNativeElement(index, this);
        return nativeLement;

    }

    async wait(){
       return new Promise((resolve,reject) => {
            const interval = setInterval(async () => {
                const count = await this.count();
                if (count !== 0){
                    clearInterval(interval)
                    resolve(true)
                }
            },500);
            setTimeout(() => {
                clearInterval(interval);
                reject(false);
            })
       });
    }

    async getItemWithText(text){
        const count = await this.count();
        let element = null;
        for(let i = 0;i < count;i++ ){
            const e = this.get(i);
            const eText = await e.getText();
            if(eText.includes(text)){
                element = e;
                break;
            }
        }
        return element;

    }


    async count(){
        // if(this.selector){
        //     const helperNativeElement = new PuppeteerNativeElement(null, null)
        //     this.nativeElements = await helperNativeElement.getNativeElements(this.selector);
        // }
        
        let sourceElement = null;
        if (this.parent){
            sourceElement = await this.parent.__checkAndGetNativeElement();
        }else{
            sourceElement = await getActor().getPuppeteerPage();

        }

        const keys = Object.keys(this.selector)
        if (keys[0] === 'css') {
            this.nativeElements =  await sourceElement.$$(this.selector[keys[0]])

        } else {
            this.nativeElements =  await sourceElement.$x(this.selector[keys[0]])
        }
        return this.nativeElements.length
    }



    async getText(){
        
    }
}

class Element {

    constructor(selector) {
        this.selector = selector
    }

    _childElement(locator){
        let newSelector = '';
        const locatorType = Object.keys(this.selector)[0]
        if (this.selector[locatorType].includes(',')) {
            for (let l of this.selector[locatorType].split(',')) {

                if (newSelector !== '') {
                    newSelector += locatorType === 'css' ? ',' : 'or';
                }
                let thisSelector = {}
                thisSelector[locatorType] = l.trim()
                newSelector += locate(thisSelector).find(locator)[locatorType]
            }
        } else {
            newSelector = locate(this.selector).find(locator)
        }
        return new Element(newSelector)
    }

    element(locator) {
        return this._childElement(locator)
    }

    $(locator) {
        return this._childElement(locator)
    }
    $$(locator) {
        return new ElementCollection({css: locator}, new PuppeteerNativeElement(this.selector, null))
    }
    wait() {
        getActor().waitForElement(this.selector, 10)
    }

    locator() {
        return this.selector
    }

    async getText(){
        return await getActor().grabTextFrom(this.selector) 
    }

    async sendKeys(keys){
        await this.click();
        await getActor().fillField(this.selector, keys) 
    }

    clear(){
        // getActor().clearField(this.selector)  
    }

    async click(){
        await getActor().click(this.selector)  
    }

    async selectOptionWithLabel(label){
        const puppeteerNativeElement = new PuppeteerNativeElement(this.selector,null)
        await puppeteerNativeElement.selectOptionWithLabel(label)
    }

    async select(option){
        await getActor().selectOption(this.selector,option)
    }

    async isPresent(){
        try {
            const count = await getActor().grabNumberOfVisibleElements(this.selector)
            return count > 0;
        } catch (err) {
            return false;
        } 
    }

    async isEnabled(){
        const isDisabled = await getActor().grabAttributeFrom(this.selector, 'disabled');
        return !isDisabled
    }

    async isDisplayed(){
        try{
            await getActor().seeElement(this.selector)
            return true;
        }catch(err){
            return false;
        } 
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

    async getTagName(){
        const el = new PuppeteerNativeElement(this.selector, null)
        return (await el.getTagName()).toLowerCase()
    }

    async uploadFile(file){
        await getActor().attachFile(this.selector, file);
    }

    static all(locator) {
        return new ElementCollection(locator)
    }

    async wait(waitInSec){
        await getActor().waitForElement(this.selector, waitInSec)
    }

    async scrollIntoView(){
        await getActor().scrollTo(this.selector)
    }

    async isSelected(){
        return await getActor().grabAttributeFrom(this.selector, 'checked');
    }

    
}


module.exports = { Element, ElementCollection }