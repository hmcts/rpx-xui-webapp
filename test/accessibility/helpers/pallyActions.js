class Actions{
   

    waitForurl(url){
        return ['wait for url to be '+url];

    }

    navigateTourl(url) {
        return ['navigate to '+url,'wait for url to be ' + url];

    }

    waitForPageWithCssLocator(cssLocator) {
        return ['wait for element ' + cssLocator+' to be visible'];

    }

    waitForPageWithCssLocatorPresent(cssLocator) {
        return ['wait for element ' + cssLocator + ' to be hidden'];

    }

    inputField(cssLocator,inputText) {
        return ['wait for element ' + cssLocator + ' to be visible', 'click element ' + cssLocator ,'set field ' + cssLocator+' to ' + inputText];

    }

    clickElement(cssLocator) {
        return ['wait for element ' + cssLocator + ' to be visible' , 'click element ' + cssLocator ];

    }

    selectOptionClick(cssLocator) {
        return [ 'click element ' + cssLocator];

    }


    waitForUrlNotTobe(url){
        return ['wait for url to not be ' + url];

    }

}

module.exports = new Actions();

