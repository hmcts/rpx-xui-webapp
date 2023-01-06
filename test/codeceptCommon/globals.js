
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should;

const browser = require('./browser')

const Element = require('./elements')

global.$$ = () => {
    function length() {
        return 1
    }
}

global.$ = (locator) => new Element(locator)


global.$$ = (locator) => new Element(locator)


global.element = (locator) => new Element(locator)
global.element.all = (locator) => Element.all(locator)



global.by =  {
    xpath: (locator) => {
        return {'xpath' : locator }
    },
    css:(locator) => {
        return {'css':locator}
    },
    linkText: () => {
        return new Element();
    }
}


global.browser = browser;