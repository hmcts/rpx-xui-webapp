
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should;

const browser = require('./browser')

const { Element, ElementCollection }= require('./elements')

global.$$ = () => {
    function length() {
        return 1
    }
}

global.$ = (locator) => new Element({'css':locator})


global.$$ = (locator) => new ElementCollection({ 'css': locator })


global.element = (locator) => new Element(locator)
global.element.all = (locator) => new ElementCollection(locator)



global.by =  {
    xpath: (locator) => {
        return {'xpath' : locator }
    },
    css:(locator) => {
        return {'css':locator}
    },
    linkText: (text) => {
        const linkLocator = locate('//')
            .find('a')
            .withText(text)
        return linkLocator.locator
    }
}


global.browser = browser;